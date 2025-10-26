import { readFileSync } from 'fs';
import { resolve } from 'path';

// Get the project root directory
// During build, process.cwd() is the project root
const projectRoot = process.cwd();
const templatesDir = resolve(projectRoot, 'server', 'templates');

console.log('Loading templates from:', templatesDir);

function loadTemplate(templateName) {
  try {
    const templatePath = resolve(templatesDir, templateName);
    console.log('Loading template:', templatePath);
    const content = readFileSync(templatePath, 'utf-8');
    console.log('✓ Successfully loaded:', templateName, `(${content.length} bytes)`);
    return content;
  } catch (error) {
    console.error(`✗ Failed to load template ${templateName}:`, error.message);
    console.error('Attempted path:', resolve(templatesDir, templateName));
    throw new Error(`Template not found: ${templateName} - ${error.message}`);
  }
}

// Pre-load all templates to ensure they're bundled
// These are loaded at module initialization time (during build)
export const templates = {
  'classic-resume.hbs': loadTemplate('classic-resume.hbs'),
  'modern-resume.hbs': loadTemplate('modern-resume.hbs'),
  'minimal-resume.hbs': loadTemplate('minimal-resume.hbs'),
  'classic-cover-letter.hbs': loadTemplate('classic-cover-letter.hbs'),
  'modern-cover-letter.hbs': loadTemplate('modern-cover-letter.hbs'),
};

console.log('✓ All templates loaded successfully');

