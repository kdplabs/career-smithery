# Gemini API Setup Guide

## Error Resolution

You're getting the error `GEMINI_API_KEY is not configured` because the Gemini API key is not set up in your environment.

## Steps to Fix

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Create Environment File

Create a `.env` file in your project root with the following content:

```env
# Gemini AI API Key
GEMINI_API_KEY=your_actual_api_key_here

# Supabase Configuration (if not already configured)
# SUPABASE_URL=your_supabase_url_here
# SUPABASE_KEY=your_supabase_anon_key_here
```

### 3. Replace the Placeholder

Replace `your_actual_api_key_here` with the actual API key you copied from Google AI Studio.

### 4. Restart the Development Server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Configuration Details

The `nuxt.config.ts` has been updated to include:

```typescript
runtimeConfig: {
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  public: {
    geminiApiKey: process.env.GEMINI_API_KEY || ''
  }
}
```

This allows the API key to be accessed both on the server side (for API endpoints) and client side (if needed).

## Security Notes

- The `.env` file is already in your `.gitignore`, so it won't be committed to version control
- Never share your API key publicly
- The API key is used only for generating cover letters and resumes

## Testing

After setting up the API key, you should be able to:
1. Go to a job's resume summary page
2. Click "Generate Cover Letter"
3. See the cover letter being generated automatically

## Troubleshooting

If you still get the error after following these steps:

1. Make sure the `.env` file is in the project root (same level as `nuxt.config.ts`)
2. Verify the API key is correct and not wrapped in quotes
3. Restart the development server completely
4. Check that the API key has the necessary permissions in Google AI Studio

