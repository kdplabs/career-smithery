# Deployment Checklist - PDF Generation Fix for Netlify

## ✅ Changes Made

### 1. Fixed Data Handling Issues
- ✅ Added JSON string parsing for existing user data
- ✅ Created `normalizeResumeData()` function to ensure all fields exist
- ✅ Added comprehensive validation and error logging
- ✅ Applied fixes to both resume and cover letter generation

### 2. Fixed Netlify Serverless Issues
- ✅ Installed `@sparticuz/chromium` (serverless-optimized Chromium)
- ✅ Installed `puppeteer-core` (Puppeteer without bundled Chromium)
- ✅ Updated both PDF generation APIs to auto-detect environment
- ✅ Updated `nuxt.config.ts` with proper transpilation settings
- ✅ Created `netlify.toml` with proper configuration

## 📋 Pre-Deployment Checklist

### Local Testing
- [ ] Test PDF download with new user data
- [ ] Test PDF download with existing user data
- [ ] Test all three resume templates (classic, modern, minimal)
- [ ] Test cover letter PDF generation
- [ ] Verify local development still works

### Code Review
- [ ] Review all changes in `server/api/generate-resume-pdf.js`
- [ ] Review all changes in `server/api/generate-cover-letter-pdf.js`
- [ ] Review `nuxt.config.ts` changes
- [ ] Review `netlify.toml` configuration
- [ ] Check that `package.json` has correct dependencies

### Git Preparation
```bash
# Check status
git status

# Review changes
git diff

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Fix PDF generation for Netlify with serverless chromium

- Add @sparticuz/chromium for serverless compatibility
- Update PDF generation APIs to auto-detect environment
- Add data normalization to handle existing user data
- Improve error logging for debugging
- Add netlify.toml configuration"

# Push to repository
git push origin main
```

## 🚀 Deployment Steps

### 1. Push to Git
```bash
git push origin main
```

### 2. Monitor Netlify Build
1. Go to Netlify Dashboard
2. Watch the build logs
3. Look for:
   - ✅ Dependencies installed successfully
   - ✅ `@sparticuz/chromium` installed
   - ✅ Build completes without errors
   - ✅ Functions deployed

### 3. Check Environment Variables
Ensure these are set in Netlify (Site settings → Environment variables):
- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (if used)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GTM_ID` (optional)

### 4. Test After Deployment
- [ ] Test resume PDF download (new user)
- [ ] Test resume PDF download (existing user)
- [ ] Test all three templates
- [ ] Test cover letter PDF download
- [ ] Check Netlify Function logs for errors
- [ ] Verify response times are acceptable (< 10 seconds)

## 🔍 Monitoring After Deployment

### Check Function Logs
1. Go to Netlify Dashboard → Functions
2. Click on `server` function
3. Monitor for:
   - Execution time (should be < 10 seconds)
   - Memory usage (should be < 1024MB)
   - Error rates (should be 0%)

### User Testing
- [ ] Ask existing users to test PDF downloads
- [ ] Monitor support tickets for PDF-related issues
- [ ] Check analytics for download success rates

## 🐛 Troubleshooting

### If Build Fails

**Error: "Cannot find module '@sparticuz/chromium'"**
```bash
# Ensure it's in dependencies, not devDependencies
npm install @sparticuz/chromium puppeteer-core --save
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

**Error: "Build exceeded memory limit"**
- This is normal during build
- Netlify should handle it automatically
- If persistent, contact Netlify support

### If PDF Generation Fails

**Error: "Timeout of 10000ms exceeded"**
- Consider upgrading to Netlify Pro (26s timeout)
- Or optimize templates to render faster
- Check if Chromium is loading properly

**Error: "Cannot find Chrome executable"**
```javascript
// Check the logs show:
console.log('executablePath:', await chromium.executablePath());
```

**Error: "Memory limit exceeded"**
- Upgrade to Netlify Pro (3008MB memory)
- Or reduce viewport size in PDF generation
- Close browser immediately after use

### If Local Development Breaks

**Error: "Cannot find module 'puppeteer'"**
```bash
# Regular puppeteer is still needed for local dev
npm install puppeteer --save
```

**Error: "Dynamic import failed"**
- This is expected in serverless mode
- Set `NETLIFY=true` to test serverless mode locally
- Or just test in production

## 📊 Performance Expectations

### First Request (Cold Start)
- **Expected time**: 5-10 seconds
- **Why**: Function initialization + Chromium loading
- **Normal**: This is expected behavior

### Subsequent Requests (Warm)
- **Expected time**: 2-4 seconds
- **Why**: Function is already initialized
- **Optimal**: Under 3 seconds

### Memory Usage
- **Expected**: 300-600MB per request
- **Peak**: Up to 800MB
- **Limit**: 1024MB (free tier), 3008MB (pro tier)

## 🎯 Success Criteria

✅ **Build Success**
- Netlify build completes without errors
- All dependencies installed
- Functions deployed successfully

✅ **Functional Success**
- PDF downloads work for all users
- All templates render correctly
- No timeout errors
- Consistent quality

✅ **Performance Success**
- Response time < 10 seconds
- No memory errors
- No timeout errors
- Cold starts acceptable

## 📝 Rollback Plan

If deployment fails and you need to rollback:

### Option 1: Revert in Netlify
1. Go to Netlify Dashboard → Deploys
2. Find the last working deployment
3. Click "Publish deploy"

### Option 2: Git Revert
```bash
# Find the commit hash of the last working version
git log --oneline

# Revert to that commit
git revert <commit-hash>

# Push
git push origin main
```

### Option 3: Temporary Fix
- Disable PDF download buttons
- Show message: "PDF generation temporarily unavailable"
- Direct users to use browser print function

## 🔗 Related Documentation

- [NETLIFY_PDF_FIX.md](./documentation/NETLIFY_PDF_FIX.md) - Detailed technical explanation
- [PDF_GENERATION_FIX.md](./documentation/PDF_GENERATION_FIX.md) - Data handling fixes
- [@sparticuz/chromium docs](https://github.com/Sparticuz/chromium) - Chromium package documentation
- [Netlify Functions docs](https://docs.netlify.com/functions/overview/) - Netlify serverless functions

## 💡 Future Improvements

### Short Term
- [ ] Add PDF caching in Supabase Storage
- [ ] Add loading progress indicator
- [ ] Add retry logic for failed downloads

### Long Term
- [ ] Consider dedicated PDF service (Gotenberg, PDFShift)
- [ ] Implement PDF queue for batch processing
- [ ] Add PDF preview before download
- [ ] Store generated PDFs to avoid regeneration

## 📞 Support

If you encounter issues:
1. Check Netlify Function logs first
2. Review error messages in browser console
3. Check this checklist for common issues
4. Review the detailed documentation files
5. Contact Netlify support if needed

---

**Last Updated**: October 26, 2025
**Status**: Ready for deployment

