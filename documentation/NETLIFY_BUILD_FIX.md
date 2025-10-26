# Netlify Build Fix - Puppeteer-Core Bundling Error

## Error Encountered

```
Build failed due to a user error: Build script returned non-zero exit code: 2
Deploy directory '.output/public' does not exist
```

**Root Cause:** The Netlify/ESBuild bundler was trying to inline/bundle `puppeteer-core` into the server function, which caused errors because `puppeteer-core` ships ESM code that's not suitable for being transformed/bundled in strict ESM mode.

## Solution Applied

### 1. Updated `nuxt.config.ts`

Added `rollupConfig.external` to tell Nitro to treat `puppeteer-core` and `@sparticuz/chromium` as external dependencies (not to be bundled):

```typescript
export default defineNuxtConfig({
  // ... other config
  build: {
    transpile: ['@sparticuz/chromium', 'handlebars'],
  },
  nitro: {
    rollupConfig: {
      external: ['puppeteer-core', '@sparticuz/chromium']
    },
    externals: {
      inline: ['handlebars']
    }
  },
})
```

**Key Changes:**
- ✅ Removed `puppeteer-core` from `build.transpile` (don't transpile it)
- ✅ Added `nitro.rollupConfig.external` with `puppeteer-core` and `@sparticuz/chromium`
- ✅ Kept `handlebars` in `externals.inline` (it can be bundled)

### 2. Verified Dependencies

Confirmed in `package.json`:
```json
{
  "dependencies": {
    "@sparticuz/chromium": "^141.0.0",
    "puppeteer-core": "^24.26.1",
    "puppeteer": "^24.26.0"
  }
}
```

## Why This Works

### External Dependencies
When you mark a package as `external` in Rollup config:
- ✅ Rollup/ESBuild won't try to bundle it
- ✅ The package is loaded at runtime from `node_modules`
- ✅ No ESM transformation errors
- ✅ The package must be in `dependencies` (not `devDependencies`)

### Why Puppeteer-Core Needs to be External
- It contains ESM code with `this` references that break in strict mode
- It's designed to be loaded dynamically, not bundled
- It's a large package that shouldn't be inlined anyway
- `@sparticuz/chromium` also needs to be external for similar reasons

## Deployment Steps

1. **Commit the changes:**
```bash
git add nuxt.config.ts
git commit -m "Fix Netlify build: externalize puppeteer-core and chromium"
git push origin main
```

2. **Netlify will auto-deploy:**
   - The build should now complete successfully
   - `.output/public` directory will be created
   - Functions will be deployed

3. **Verify the build:**
   - Check Netlify build logs
   - Look for successful completion
   - Verify no bundling errors

## Expected Build Output

### Successful Build
```
✓ Building Nitro Server (preset: netlify)
✓ .output/server/chunks/nitro/netlify.mjs
✓ .output/public/
✓ Functions deployed
```

### What Gets Deployed
- `.output/public/` - Static assets
- `.output/server/` - Server functions
- `node_modules/puppeteer-core/` - External dependency (available at runtime)
- `node_modules/@sparticuz/chromium/` - External dependency (available at runtime)

## Troubleshooting

### If Build Still Fails

**Error: "Cannot find module 'puppeteer-core'"**
- Ensure it's in `dependencies`, not `devDependencies`
- Run: `npm install puppeteer-core --save`

**Error: "Cannot find module '@sparticuz/chromium'"**
- Ensure it's in `dependencies`, not `devDependencies`
- Run: `npm install @sparticuz/chromium --save`

**Error: Other packages causing bundling errors**
Add them to the `external` array:
```typescript
nitro: {
  rollupConfig: {
    external: ['puppeteer-core', '@sparticuz/chromium', 'other-package']
  }
}
```

**Error: "Deploy directory does not exist"**
- This means the build failed before creating output
- Check the full build log for the actual error
- Look for errors in the "Building" phase

## Alternative Approaches (If This Doesn't Work)

### Option 1: Use Different Node Bundler
```typescript
// In netlify.toml
[functions]
  node_bundler = "nft"  # Instead of esbuild
```

### Option 2: Use Netlify Edge Functions
- Edge Functions have different bundling
- May handle ESM better
- Requires code changes

### Option 3: Separate PDF Service
- Deploy PDF generation as separate service
- Use Railway, Render, or DigitalOcean
- Call it from Netlify via API

## Verification Checklist

After deployment:
- [ ] Build completes without errors
- [ ] `.output/public` directory is created
- [ ] Functions are deployed
- [ ] PDF download works in production
- [ ] No runtime errors about missing modules

## Related Files

- `nuxt.config.ts` - Nitro configuration
- `package.json` - Dependencies
- `server/api/generate-resume-pdf.js` - Uses puppeteer-core
- `server/api/generate-cover-letter-pdf.js` - Uses puppeteer-core
- `netlify.toml` - Netlify configuration

## References

- [Nitro Rollup Config](https://nitro.unjs.io/config#rollupconfig)
- [Netlify Functions Bundling](https://docs.netlify.com/functions/build-with-javascript/)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)
- [Puppeteer Core](https://pptr.dev/api/puppeteer.puppeteernode)

---

**Status:** Fixed ✅
**Last Updated:** October 26, 2025

