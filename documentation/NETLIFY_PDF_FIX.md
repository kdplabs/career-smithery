# Netlify PDF Generation Fix

## Problem
PDF generation works locally but fails on Netlify with a 500 error. This is because:

1. **Puppeteer doesn't work in serverless** - Regular Puppeteer downloads Chromium (170MB+) which exceeds Netlify's limits
2. **Missing system dependencies** - Chromium needs system libraries not available in serverless
3. **Function timeouts** - Default 10-second timeout is too short for PDF generation

## Solution Implemented

### 1. Installed Serverless-Optimized Packages

```bash
npm install @sparticuz/chromium puppeteer-core --save
```

**What these do:**
- `@sparticuz/chromium` - Lightweight Chromium binary optimized for AWS Lambda/Netlify (works in serverless)
- `puppeteer-core` - Puppeteer without bundled Chromium (we provide our own via @sparticuz/chromium)

### 2. Updated PDF Generation APIs

Modified both:
- `/server/api/generate-resume-pdf.js`
- `/server/api/generate-cover-letter-pdf.js`

**Key changes:**
```javascript
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Auto-detect environment and use appropriate browser
const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

if (isServerless) {
  // Use lightweight chromium for serverless
  browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
} else {
  // Use regular puppeteer for local development
  const puppeteerRegular = await import('puppeteer');
  browser = await puppeteerRegular.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}
```

### 3. Updated Nuxt Configuration

Modified `nuxt.config.ts`:
```javascript
build: {
  transpile: ['puppeteer-core', '@sparticuz/chromium', 'handlebars'],
},
nitro: {
  externals: {
    inline: ['puppeteer-core', 'handlebars']
  }
}
```

### 4. Created Netlify Configuration

Created `netlify.toml`:
- Configured proper build settings
- Ensured Handlebars templates are included in deployment
- Set up function configuration

## Files Modified

1. ✅ `package.json` - Added @sparticuz/chromium and puppeteer-core
2. ✅ `server/api/generate-resume-pdf.js` - Updated to use serverless chromium
3. ✅ `server/api/generate-cover-letter-pdf.js` - Updated to use serverless chromium
4. ✅ `nuxt.config.ts` - Updated build configuration
5. ✅ `netlify.toml` - Created Netlify configuration

## Deployment Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Fix PDF generation for Netlify with serverless chromium"
git push origin main
```

### 2. Netlify Will Auto-Deploy
Netlify should automatically detect the push and start building.

### 3. Monitor Build Logs
Watch the Netlify build logs for:
- Successful installation of @sparticuz/chromium
- No errors during build
- Function deployment success

### 4. Test After Deployment
1. Try downloading a resume PDF
2. Try downloading a cover letter PDF
3. Check both new and existing users
4. Test all three templates (classic, modern, minimal)

## Important Notes

### Environment Variables
Make sure these are set in Netlify UI (Site settings → Environment variables):
- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GTM_ID` (optional)

### Function Timeouts
- Free tier: 10 seconds max
- Pro tier: 26 seconds max
- If you still get timeouts, consider upgrading to Pro tier

### Memory Limits
- Free tier: 1024MB max
- Pro tier: 3008MB max
- Chromium needs ~512MB minimum

### Cold Starts
First PDF generation after deployment or inactivity may take 5-10 seconds due to:
- Function cold start
- Chromium initialization
- Template loading

Subsequent requests should be faster (2-3 seconds).

## Troubleshooting

### If PDF generation still fails:

1. **Check Netlify Function Logs**
   - Go to Netlify Dashboard → Functions
   - Click on the failing function
   - Check logs for specific errors

2. **Common Issues:**

   **"Cannot find module '@sparticuz/chromium'"**
   - Solution: Make sure the package is in `dependencies`, not `devDependencies`
   - Rebuild: `npm install && npm run build`

   **"Timeout of 10000ms exceeded"**
   - Solution: Upgrade to Netlify Pro for longer timeouts
   - Or optimize: Reduce viewport size, use simpler templates

   **"Memory limit exceeded"**
   - Solution: Upgrade to Netlify Pro for more memory
   - Or optimize: Close browser immediately after PDF generation

   **"Chromium executable not found"**
   - Solution: Ensure `@sparticuz/chromium` is properly installed
   - Check that `executablePath: await chromium.executablePath()` is being called

3. **Test Locally First**
   ```bash
   # Set Netlify environment variable to test serverless mode
   NETLIFY=true npm run dev
   ```

4. **Check Package Versions**
   ```bash
   npm list @sparticuz/chromium puppeteer-core
   ```
   Should show:
   - `@sparticuz/chromium@latest`
   - `puppeteer-core@24.x.x` (matching your puppeteer version)

## Alternative Solutions (If This Doesn't Work)

### Option 1: Use a PDF Generation Service
- **Gotenberg** (self-hosted or cloud)
- **PDFShift** (paid API)
- **CloudConvert** (paid API)

### Option 2: Switch to Different Hosting
- **Vercel** (similar to Netlify, same issues)
- **Railway** (better for long-running processes)
- **Render** (has background workers)
- **DigitalOcean App Platform** (more resources)

### Option 3: Use Client-Side PDF Generation
- Keep using `html2canvas` + `jsPDF` (already in your code)
- Downside: Lower quality, inconsistent rendering

## Performance Tips

1. **Reuse Browser Instances** (if possible)
   - Keep browser open between requests
   - Only works with persistent servers, not serverless

2. **Optimize Templates**
   - Minimize external resources
   - Use inline styles instead of external CSS
   - Reduce image sizes

3. **Cache Generated PDFs**
   - Store in Supabase Storage
   - Only regenerate when resume data changes
   - Serve cached version for repeat downloads

## Success Indicators

✅ Build completes without errors
✅ Functions deploy successfully
✅ PDF downloads work for all users
✅ No timeout errors
✅ Consistent rendering across downloads
✅ Response time under 10 seconds

## Monitoring

After deployment, monitor:
- Function execution time (Netlify Analytics)
- Error rates (Netlify Function logs)
- User reports of download failures
- Memory usage (Netlify Function logs)

