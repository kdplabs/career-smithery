import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read templates at build time and export as strings
// This ensures they're bundled with the function
const templatesDir = join(__dirname, '..', 'templates');

export function getTemplate(templateName) {
  try {
    const templatePath = join(templatesDir, templateName);
    return readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`Failed to load template ${templateName}:`, error);
    throw new Error(`Template not found: ${templateName}`);
  }
}

// Pre-load all templates to ensure they're bundled
export const templates = {
  'classic-resume.hbs': getTemplate('classic-resume.hbs'),
  'modern-resume.hbs': getTemplate('modern-resume.hbs'),
  'minimal-resume.hbs': getTemplate('minimal-resume.hbs'),
  'classic-cover-letter.hbs': getTemplate('classic-cover-letter.hbs'),
  'modern-cover-letter.hbs': getTemplate('modern-cover-letter.hbs'),
};

