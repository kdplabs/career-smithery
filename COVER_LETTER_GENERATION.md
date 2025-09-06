# Cover Letter Generation Feature

## Overview
The cover letter generation feature has been enhanced to automatically generate cover letters when clicking the "Generate Cover Letter" button from the resume summary page. This eliminates the need for users to manually paste job descriptions and provides a seamless experience.

## Changes Made

### 1. Resume Summary Page (`pages/resume-summary.vue`)
- **Modified the "Generate Cover Letter" button**: Changed from a `NuxtLink` to a `button` element
- **Added state management**: Added `generatingCoverLetter` ref to track generation status
- **Implemented `generateCoverLetter` function**: 
  - Validates that resume data and job description are available
  - Calls the `/api/generate-cover-letter` endpoint with resume data and job description
  - Saves the generated cover letter to localStorage
  - Navigates to the cover letter page
  - Includes proper error handling and loading states

### 2. Cover Letter Page (`pages/cover-letter.vue`)
- **Added loading state**: Shows a spinner while checking for existing cover letter data
- **Enhanced data loading**: Automatically loads generated cover letter data from localStorage on mount
- **Improved user experience**: Users see the generated cover letter immediately if available

### 3. API Endpoint (`server/api/generate-cover-letter.js`)
- **Improved error handling**: Uses `createError` for proper HTTP error responses
- **Better error messages**: Provides more detailed error information

## How It Works

1. **User clicks "Generate Cover Letter"** on the resume summary page
2. **System validates data**: Checks that resume data and job description are available
3. **API call**: Sends resume data and job description to Gemini AI via the API endpoint
4. **AI processing**: Gemini generates a personalized cover letter based on the resume and job requirements
5. **Data storage**: Generated cover letter is saved to localStorage
6. **Navigation**: User is redirected to the cover letter page
7. **Display**: Cover letter page automatically loads and displays the generated content

## Features

- **Automatic generation**: No manual job description input required
- **Personalized content**: AI tailors the cover letter to the specific job and resume
- **Rich output**: Includes cover letter text, company highlights, aligned skills, and alignment score
- **Error handling**: Comprehensive error handling with user-friendly messages
- **Loading states**: Visual feedback during generation process
- **Data persistence**: Generated cover letters are saved and can be accessed later

## Technical Details

### Data Flow
```
Resume Summary Page → API Call → Gemini AI → Cover Letter Data → localStorage → Cover Letter Page
```

### API Request Structure
```javascript
{
  resumeData: { /* complete resume object */ },
  jobDescription: "job description text"
}
```

### API Response Structure
```javascript
{
  coverLetterText: "personalized cover letter content",
  companyHighlights: [
    {
      companyName: "Company Name",
      keyAchievements: ["achievement 1", "achievement 2", "achievement 3"]
    }
  ],
  alignedSkills: [
    {
      skillName: "Skill Name",
      iconName: "heroicon-name",
      relevance: "explanation of relevance"
    }
  ],
  alignmentScore: 85,
  generatedAt: "2024-01-01T00:00:00.000Z"
}
```

## Dependencies
- Gemini AI API for cover letter generation
- localStorage for data persistence
- Nuxt 3 composables for state management

## Future Enhancements
- Add ability to regenerate cover letters with different styles
- Implement cover letter templates
- Add cover letter editing capabilities
- Include cover letter version history

