# Error Logging Enhancement for PDF Generation

## Overview
Enhanced error logging for both server-side and client-side PDF generation to provide detailed debugging information when errors occur.

## Changes Made

### Server-Side Enhancements

#### 1. `server/api/generate-resume-pdf.js`
Added detailed error response that includes:
- `message` - The error message
- `name` - The error type/name
- `stack` - Full stack trace
- `timestamp` - When the error occurred
- `template` - Which template was being used
- `hasResumeData` - Whether resume data was present
- `hasNormalizedData` - Whether data was successfully normalized
- `environment` - Deployment environment (netlify/vercel/local)

**Example error response:**
```json
{
  "statusCode": 500,
  "statusMessage": "Failed to generate PDF resume: Cannot find Chrome executable",
  "data": {
    "message": "Cannot find Chrome executable",
    "name": "Error",
    "stack": "Error: Cannot find Chrome executable\n    at ...",
    "timestamp": "2025-10-26T00:00:00.000Z",
    "template": "classic",
    "hasResumeData": true,
    "hasNormalizedData": true,
    "environment": "netlify"
  }
}
```

#### 2. `server/api/generate-cover-letter-pdf.js`
Added similar detailed error response with:
- Same fields as resume PDF
- `hasCoverLetterData` - Whether cover letter data was present
- `hasResumeData` - Whether resume data was present

### Client-Side Enhancements

#### 1. `pages/resume-summary.vue` - `downloadResumeFromServer()`
Enhanced error handling to:
- Parse server error response
- Log detailed error information to console
- Extract and display specific error message to user
- Log full context including resume data and template

**Console output on error:**
```javascript
// Server error response (raw text)
console.error('Server error response:', errorText)

// Parsed error details (if JSON)
console.error('Parsed error details:', {
  message: "Cannot find Chrome executable",
  name: "Error",
  stack: "...",
  timestamp: "2025-10-26T00:00:00.000Z",
  template: "classic",
  environment: "netlify"
})

// Client-side context
console.error('Error details:', {
  message: error.message,
  stack: error.stack,
  resumeData: { /* full resume data */ },
  template: 'classic'
})
```

#### 2. `pages/cover-letter.vue` - `downloadCoverLetterFromServer()`
Same enhancements as resume download with cover letter specific context.

## Benefits

### For Debugging
1. **Server logs** show exactly what went wrong and where
2. **Client logs** show the full context of the request
3. **Environment detection** helps identify platform-specific issues
4. **Stack traces** help pinpoint the exact line of failure

### For Users
1. More specific error messages instead of generic "Failed to generate PDF"
2. Better understanding of what went wrong
3. Easier to report issues with detailed information

### For Developers
1. Faster debugging with comprehensive error information
2. Can identify patterns in errors (e.g., all Netlify errors, specific template errors)
3. Can see if data normalization is working correctly
4. Can verify environment detection is working

## How to Use

### When Testing Locally
1. Open browser console (F12)
2. Try to download a PDF
3. If it fails, check console for:
   - "Server error response:" - Raw server response
   - "Parsed error details:" - Structured error data
   - "Error details:" - Client-side context

### When Debugging Production Issues
1. Ask user to open browser console
2. Ask them to try downloading PDF
3. Have them copy all console errors
4. Check Netlify Function logs for server-side details

### Reading the Logs

**Server-side (Netlify Function logs):**
```
Puppeteer PDF generation error: Error: Cannot find Chrome executable
Error stack: Error: Cannot find Chrome executable
    at puppeteer.launch (...)
Error name: Error
Normalized resume data structure: { personalInfo: {...}, ... }
Error details being sent to client: { message: "...", environment: "netlify", ... }
```

**Client-side (Browser console):**
```
Server error response: {"statusCode":500,"statusMessage":"...","data":{...}}
Parsed error details: { message: "...", stack: "...", environment: "netlify" }
Error downloading server-side generated resume: Error: Cannot find Chrome executable
Error details: { message: "...", resumeData: {...}, template: "classic" }
```

## Common Error Patterns

### 1. Chrome Executable Not Found
```
environment: "netlify"
message: "Cannot find Chrome executable"
```
**Solution:** Check that @sparticuz/chromium is installed and executablePath is correct

### 2. Data Format Issues
```
hasResumeData: true
hasNormalizedData: false
message: "Cannot read property 'fullName' of undefined"
```
**Solution:** Check data normalization function

### 3. Template Rendering Issues
```
template: "modern"
message: "Cannot read property 'technical' of undefined"
```
**Solution:** Check template file for missing field handling

### 4. Timeout Issues
```
environment: "netlify"
message: "Navigation timeout of 30000 ms exceeded"
```
**Solution:** Increase timeout or optimize template loading

## Testing

To test error logging:

1. **Test with invalid data:**
```javascript
// In browser console
fetch('/api/generate-resume-pdf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ resumeData: null, template: 'classic' })
})
```

2. **Check console output** for detailed error information

3. **Verify server logs** in Netlify dashboard

## Future Improvements

1. Add error tracking service (Sentry, LogRocket)
2. Add error rate monitoring
3. Add automatic error reporting
4. Add user-friendly error messages with solutions
5. Add retry logic for transient errors

---

**Status:** Implemented ✅  
**Last Updated:** October 26, 2025

