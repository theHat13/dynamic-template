# HAT Dynamic Template - Architecture

## Main Structure

### Key Directories

- `src/_data/`: Site data
- `src/_includes/`: Templates (Atomic Design)
- `src/assets/`: Static resources
- `src/blog/`: Blog posts
- `src/admin/`: Decap CMS configuration

## Atomic Design Organization

### Atoms (`src/_includes/atoms/`)

- Basic elements: buttons, forms, links
- Simple, reusable components

### Molecules (`src/_includes/molecules/`)

- Combinations of atoms
- Cards, form groups, navigation elements

### Organisms (`src/_includes/organisms/`)

- Complex components
- Global sections (header, footer)
- Page sections

## Development Strategy

### Component Creation

1. Define data (`src/_data/`)
2. Create Nunjucks template
3. Document with Storybook

### Template Example

```njk
{% macro renderComponent(options) %}
  <!-- Component implementation -->
{% endmacro %}
```

## Style Management

- Using Tailwind CSS
- Single `input.css` file
- Custom styles in Tailwind configuration

## JavaScript

- Component scripts in `src/js/components/`
- Progressive approach without heavy frameworks

## Documentation

- Component documentation via Storybook
- `.stories.js` and `.mdx` files

## Migration Plan

1. Create new directory structure
2. Migrate data files
3. Migrate templates
4. Update Eleventy configuration
5. Create documentation
6. Test and refine
