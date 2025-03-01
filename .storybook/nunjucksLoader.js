import nunjucks from 'nunjucks';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Nunjucks environment
const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader([
    path.resolve(__dirname, '../src/_includes'),
    path.resolve(__dirname, '../src')
  ]),
  { autoescape: true }
);

// Helper to load data from JSON files
const loadData = (dataPath) => {
  try {
    const filePath = path.resolve(__dirname, '../src/_data', `${dataPath}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return {};
  } catch (error) {
    console.error(`Error loading data for ${dataPath}:`, error);
    return {};
  }
};

// Add global data and helper functions
try {
  nunjucksEnv.addGlobal('site', loadData('site'));
  nunjucksEnv.addGlobal('about', loadData('about'));
  nunjucksEnv.addGlobal('hero', loadData('hero'));
  nunjucksEnv.addGlobal('links', loadData('links'));
} catch (error) {
  console.error('Error loading global data:', error);
}

/**
 * Renders a Nunjucks template with provided data
 * 
 * @param {string} templatePath - Path to the template relative to src/_includes
 * @param {object} data - Data to pass to the template
 * @returns {string} - Rendered HTML
 */
export const renderTemplate = (templatePath, data = {}) => {
  try {
    const html = nunjucksEnv.render(templatePath, data);
    console.log(`Rendered template ${templatePath}`);
    return html;
  } catch (error) {
    console.error(`Error rendering template ${templatePath}:`, error);
    return `<div class="error">Error rendering ${templatePath}: ${error.message}</div>`;
  }
};

export const nunjucksEnvironment = nunjucksEnv;