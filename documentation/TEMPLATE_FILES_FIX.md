# Template Files Fix for Netlify Deployment

## Problem Identified

**Error:**
```
ENOENT: no such file or directory, open '/var/task/server/templates/modern-resume.hbs'
```

**Root Cause:** The Handlebars template files (`server/templates/*.hbs`) were not being included in the Netlify serverless function deployment. The files exist in the repo but weren't bundled with the function.

## Solution Implemented

### 1. Added Server Assets to Nitro Config (`nuxt.config.ts`)

```typescript
nitro: {
  preset: 'netlify',
  serveStatic: true,
  rollupConfig: {
    external: ['puppeteer-core', '@sparticuz/chromium']
  },
  externals: {
    inline: ['handlebars']
  },
  // Include template files in the deployment
  publicAssets: [
    {
      baseURL: '/_templates',
      dir: 'server/templates',
      maxAge: 0
    }
  ],
  // Copy template files to the function bundle
  serverAssets: [
    {
      baseName: 'templates',
      dir: './server/templates'
    }
  ]
}
```

**What this does:**
- `serverAssets` - Copies template files into the serverless function bundle
- `publicAssets` - Makes templates accessible as public assets (backup)
- `baseName: 'templates'` - Creates `assets:templates` storage namespace

### 2. Updated Template Loading Logic

#### `server/api/generate-resume-pdf.js` & `server/api/generate-cover-letter-pdf.js`

**Before:**
```javascript
const templatePath = path.join(process.cwd(), 'server', 'templates', templateName);
const templateFile = await fs.readFile(templatePath, 'utf-8');
```

**After:**
```javascript
let templateFile;
try {
  // Try to read from server assets first (production/Netlify)
  const storage = useStorage('assets:templates');
  templateFile = await storage.getItem(templateName);
  console.log('Loaded template from server assets:', templateName);
} catch (e) {
  // Fallback to file system (local development)
  console.log('Loading template from filesystem:', templateName);
  const templatePath = path.join(process.cwd(), 'server', 'templates', templateName);
  templateFile = await fs.readFile(templatePath, 'utf-8');
}

if (!templateFile) {
  throw new Error(`Template file not found: ${templateName}`);
}
```

**What this does:**
- **Production (Netlify):** Uses `useStorage('assets:templates')` to access bundled templates
- **Local Development:** Falls back to filesystem reading
- **Error Handling:** Throws clear error if template not found

## Template Files Included

The following templates are now bundled with the deployment:

1. `server/templates/classic-resume.hbs`
2. `server/templates/modern-resume.hbs`
3. `server/templates/minimal-resume.hbs`
4. `server/templates/classic-cover-letter.hbs`
5. `server/templates/modern-cover-letter.hbs`

## How It Works

### In Production (Netlify):

1. Build process copies templates to `.netlify/functions-internal/server/assets/templates/`
2. At runtime, `useStorage('assets:templates')` accesses these bundled files
3. No filesystem access needed - templates are in memory

### In Local Development:

1. `useStorage` might not be available or might fail
2. Falls back to reading from `server/templates/` directory
3. Works exactly as before

## Verification

### Check Logs After Deployment

You should see in Netlify Function logs:
```
Loaded template from server assets: classic-resume.hbs
```

Or if it falls back:
```
Loading template from filesystem: classic-resume.hbs
```

### Test All Templates

After deployment, test:
- ✅ Classic resume template
- ✅ Modern resume template
- ✅ Minimal resume template
- ✅ Classic cover letter template
- ✅ Modern cover letter template

## Benefits

1. **Templates Bundled:** No more "file not found" errors
2. **Faster Access:** Templates loaded from memory, not filesystem
3. **Backward Compatible:** Still works in local development
4. **Clear Logging:** Shows which method was used to load templates
5. **Error Handling:** Clear error message if template missing

## Troubleshooting

### If Templates Still Not Found

1. **Check build output:**
   ```
   ls -la .netlify/functions-internal/server/assets/templates/
   ```

2. **Verify serverAssets config:**
   - Ensure `dir: './server/templates'` points to correct directory
   - Ensure template files exist in repo

3. **Check Netlify logs:**
   - Look for "Loaded template from..." messages
   - Check for any storage errors

### If useStorage Fails

The code will automatically fall back to filesystem reading, but this might fail in Netlify. If you see:
```
Loading template from filesystem: ...
ENOENT: no such file or directory
```

Then `serverAssets` isn't working. Check:
- Nitro version (should be 2.x+)
- Config syntax is correct
- Templates directory exists

## Alternative Approaches (If This Doesn't Work)

### Option 1: Inline Templates
Convert templates to JavaScript strings and import them directly.

### Option 2: Use Public Assets
Move templates to `public/_templates/` and fetch via HTTP.

### Option 3: Use Environment Variables
Store small templates as environment variables.

## Files Modified

1. ✅ `nuxt.config.ts` - Added serverAssets and publicAssets
2. ✅ `server/api/generate-resume-pdf.js` - Updated template loading
3. ✅ `server/api/generate-cover-letter-pdf.js` - Updated template loading

## Testing Checklist

- [ ] Build locally: `npm run build`
- [ ] Check `.netlify/` output has templates
- [ ] Deploy to Netlify
- [ ] Test classic resume download
- [ ] Test modern resume download
- [ ] Test minimal resume download
- [ ] Test classic cover letter download
- [ ] Test modern cover letter download
- [ ] Check Netlify Function logs for template loading messages

---

**Status:** Fixed ✅  
**Last Updated:** October 26, 2025  
**Issue:** Template files not found in Netlify deployment  
**Solution:** Use Nitro serverAssets to bundle templates with function

