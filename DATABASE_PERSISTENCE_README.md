# Database Persistence Implementation

## Overview
This implementation moves the resume and cover letter data storage from localStorage to the database for better persistence across devices and improved data management.

## Changes Made

### 1. New Database Composable (`composables/useDatabase.js`)
Created a new composable that handles all database operations for resume and cover letter data:

- `saveResumeToDatabase(jobId, resumeData)` - Saves resume data to database
- `getResumeFromDatabase(jobId)` - Retrieves resume data from database
- `saveCoverLetterToDatabase(jobId, coverLetterData)` - Saves cover letter data to database
- `getCoverLetterFromDatabase(jobId)` - Retrieves cover letter data from database
- `updateJobStatus(jobId, status)` - Updates job status
- `getJobWithData(jobId)` - Gets complete job data including resume and cover letter

### 2. Updated Cover Letter Page (`pages/cover-letter.vue`)
- Replaced localStorage operations with database operations
- Updated data loading to fetch from database on mount
- Modified save operations to persist to database
- Added proper error handling for database operations

### 3. Updated Resume Summary Page (`pages/resume-summary.vue`)
- Replaced localStorage operations with database operations
- Updated cover letter generation to save to database
- Modified data loading to use database persistence
- Added success message handling from resume wizard

### 4. Updated Resume Wizard (`pages/resume-wizard.vue`)
- Enhanced to handle both new job creation and existing job updates
- Added logic to update existing jobs with resume data when jobId is provided
- Updated redirect logic to go to resume summary page for existing jobs

### 5. Updated Jobs Page (`pages/jobs/index.vue`)
- Added cover letter viewing functionality
- Updated to check for cover letter data in database
- Added navigation to cover letter page

## Database Schema

The implementation uses the existing `user_jobs` table with the following key columns:

- `resume_data` (JSONB) - Stores complete resume wizard data and generated resume
- `cover_letter_data` (JSONB) - Stores cover letter generation data and final letter
- `status` - Tracks job status (saved, resume_created, cover_letter_created, etc.)
- `match_score` (INTEGER) - Resume-job match score

## Migration Required

Run the following SQL migration in your Supabase database to ensure proper table structure:

```sql
-- Migration to ensure user_jobs table has proper structure for resume and cover letter data
-- This migration ensures the table exists with the correct columns

-- Create user_jobs table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  job_description TEXT,
  job_url VARCHAR(500),
  location VARCHAR(255),
  salary_range VARCHAR(100),
  status VARCHAR(50) DEFAULT 'saved' CHECK (status IN ('saved', 'resume_created', 'cover_letter_created', 'applied', 'interviewing', 'offered', 'rejected', 'withdrawn')),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  resume_data JSONB, -- Complete resume wizard data + generated resume
  cover_letter_data JSONB, -- Cover letter generation data + final letter
  match_score INTEGER, -- Resume-job match score
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns if they don't exist (for existing tables)
DO $$ 
BEGIN
  -- Add resume_data column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_jobs' AND column_name = 'resume_data') THEN
    ALTER TABLE user_jobs ADD COLUMN resume_data JSONB;
  END IF;
  
  -- Add cover_letter_data column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_jobs' AND column_name = 'cover_letter_data') THEN
    ALTER TABLE user_jobs ADD COLUMN cover_letter_data JSONB;
  END IF;
  
  -- Add match_score column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_jobs' AND column_name = 'match_score') THEN
    ALTER TABLE user_jobs ADD COLUMN match_score INTEGER;
  END IF;
  
  -- Add notes column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_jobs' AND column_name = 'notes') THEN
    ALTER TABLE user_jobs ADD COLUMN notes TEXT;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_jobs_user_id ON user_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_jobs_status ON user_jobs(status);
CREATE INDEX IF NOT EXISTS idx_user_jobs_created_at ON user_jobs(created_at);

-- Enable RLS if not already enabled
ALTER TABLE user_jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own jobs" ON user_jobs;
DROP POLICY IF EXISTS "Users can create jobs" ON user_jobs;
DROP POLICY IF EXISTS "Users can update own jobs" ON user_jobs;
DROP POLICY IF EXISTS "Users can delete own jobs" ON user_jobs;

-- Create RLS Policies
-- Users can only see their own jobs
CREATE POLICY "Users can view own jobs" ON user_jobs
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own jobs
CREATE POLICY "Users can create jobs" ON user_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own jobs
CREATE POLICY "Users can update own jobs" ON user_jobs
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own jobs
CREATE POLICY "Users can delete own jobs" ON user_jobs
  FOR DELETE USING (auth.uid() = user_id);

-- Create or replace the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_jobs_updated_at ON user_jobs;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_jobs_updated_at
  BEFORE UPDATE ON user_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Benefits

1. **Cross-Device Persistence**: Data is now stored in the database and accessible from any device
2. **Better Data Management**: Centralized storage with proper indexing and relationships
3. **Improved Security**: Row-level security policies ensure users can only access their own data
4. **Scalability**: Database storage is more scalable than localStorage
5. **Data Integrity**: Proper constraints and validation at the database level

## Usage

The implementation maintains the same user experience while providing better data persistence:

1. **Creating a Resume**: Data is automatically saved to the database when generated
2. **Generating a Cover Letter**: Data is saved to the database and linked to the specific job
3. **Editing**: All edits are persisted to the database in real-time
4. **Viewing**: Data is loaded from the database when viewing resumes or cover letters

## Migration from localStorage

Existing users with data in localStorage will need to regenerate their resumes and cover letters, as the data will be stored in the database going forward. The system will automatically handle new data storage in the database.
