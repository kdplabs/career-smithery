// Import templates as inline strings (generated at build time)
import {
  classic_resume_hbs,
  modern_resume_hbs,
  minimal_resume_hbs,
  classic_cover_letter_hbs,
  modern_cover_letter_hbs
} from './template-strings.js';

// Export templates as an object for easy access
export const templates = {
  'classic-resume.hbs': classic_resume_hbs,
  'modern-resume.hbs': modern_resume_hbs,
  'minimal-resume.hbs': minimal_resume_hbs,
  'classic-cover-letter.hbs': classic_cover_letter_hbs,
  'modern-cover-letter.hbs': modern_cover_letter_hbs,
};

console.log('✓ Templates loaded from inline strings');

