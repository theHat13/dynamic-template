# HAT Dynamic Template (HDT) Development Guide

## Build Commands
- Start dev server: `npm start` (runs TailwindCSS watcher & Eleventy server)
- Build site: `npm run build` (runs Eleventy build)
- Refresh project: `npm run refresh` (clears cache & CSS output)

## Project Structure
- `/src/_includes`: Components using Atomic Design pattern
- `/src/_data`: JSON data files for template variables
- `/src/assets`: Static assets (images, SVGs)
- `/src/blog`: Markdown blog posts with frontmatter

## Code Style Guidelines
- Follow Nunjucks template conventions with consistent indentation (2 spaces)
- Use BEM naming convention for custom CSS classes
- Keep components modular and reusable
- Use TailwindCSS utility classes when appropriate
- Maintain organization within Atomic Design system (atoms, molecules, organisms)
- JSON data files should use camelCase for property names
- Follow semantic HTML practices
- Ensure responsive design for all components