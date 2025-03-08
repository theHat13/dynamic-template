# HAT Dynamic Template - Architecture Documentation

## Overview

HAT Dynamic Template is a modular front-end development framework built on Eleventy, Nunjucks, and TailwindCSS. It follows a custom OMA structure (Core, Organisms, Molecules, Atoms) to create consistent and maintainable web components.

## Directory Structure

```sh
src/
├── _data/            # Data files for templates
│   ├── contents/     # Content-related data
│   │   └── atoms/    # Content data for atomic components
│   ├── styles/       # Style-related data
│   │   └── atoms/    # Style data for atomic components
│   └── site.json     # Global site configuration
├── _includes/        # Component templates
│   ├── 00-core/      # Base templates
│   │   ├── base.njk  # HTML base template
│   │   ├── header.njk
│   │   └── footer.njk
│   ├── 01-organisms/ # Page sections
│   │   └── sections/ # Complete sections like hero, featured, about
│   ├── molecules/    # Composite components (made from organisms and atoms)
│   │   ├── cards/    # Card components
│   │   ├── forms/    # Form groups
│   └── atoms/        # Basic components

├── admin/            # Decap CMS configuration
├── assets/           # Static assets
│   ├── images/
│   └── svg/
├── blog/             # Blog content
├── js/               # JavaScript files
│   └── components/   # Component-specific scripts
├── stories/          # Storybook stories
│   ├── atoms/        # Stories for atomic components
│   ├── molecules/    # Stories for molecule components
│   └── organisms/    # Stories for organism components
├── input.css         # Main TailwindCSS file
└── *.njk             # Page templates
```

## Component Architecture (OMA)

The framework uses a four-tiered component architecture with an inverted numbering system:

### 0. Core (00-core)

Core templates provide the foundational structure for all pages:

- `base.njk`: The main HTML template with head and body structure
- `header.njk`: Global site header
- `footer.njk`: Global site footer

### 1. Organisms (01-organisms)

Organisms are relatively complex components that form distinct sections of the interface.

**Examples:**

- Hero sections
- Featured content sections
- Contact forms
- Article sections
- Page-level sections

### 2. Molecules (molecules)

Molecules are groups of components that work together as a unit to perform a more complex function.

**Examples:**

- Cards
- Form groups
- Alert messages
- Navigation menu
- Carousels

### 3. Atoms (atoms)

Atoms are the smallest building blocks of the interface - they cannot be broken down further without losing their functionality.

**Examples:**

- Buttons
- Form inputs
- Tags
- Links
- Icons
- Tooltips

### 4. Pages (Optional)

Pages combine these components to create complete user interfaces. In this framework, pages are typically:

- Root level `.njk` files
- Templates in special directories like `blog/`

## Data Structure

The framework separates content from presentation:

### Content Data (`_data/contents/`)

Contains the actual content to be displayed in components, with localized text, labels, and example data.

**Example (`contents/atoms/links.json`):**

```json
{
  "component": "link",
  "link_data": {
    "link_home": {
      "name": "home",
      "href": "/", 
      "text": "Home",
      "variant": "default"
    }
  }
}
```

### Style Data (`_data/styles/`)

Contains style-specific information for components, including variants, classes, and default properties.

**Example (`styles/atoms/tag.json`):**

```json
{
  "name": "Tag",
  "variants": [
    {
      "name": "default",
      "class": "tag--default bg-gray-100 text-gray-800"
    },
    {
      "name": "success",
      "class": "tag--success bg-green-100 text-green-800"
    }
  ],
  "defaultProps": {
    "variant": "default"
  }
}
```

## Component Templates

Templates are built using Nunjucks macros for reusability. Each component follows a standard pattern:

```njk
{% macro renderComponentName(options) %}
  {# Extract options with default values #}
  {% set option1 = options.option1 | default('default value') %}
  
  {# Render the component #}
  <div class="component-name">
    {{ option1 }}
  </div>
{% endmacro %}
```

## Storybook Integration

Components are documented and showcased using Storybook:

- Each component has a `.stories.js` file
- Stories demonstrate different variants and usage examples
- Detailed documentation for component usage is included

## Integration with Decap CMS

The framework includes configuration for Decap CMS:

- `admin/config.yml` defines the content model
- Content collections map to site sections
- Media management is configured for Netlify uploads

## Styling with TailwindCSS

- Single `input.css` file for custom styles and Tailwind configuration
- TailwindCSS classes for styling components
- Theme customization via CSS variables

## Documentation

Documentation is available in the `docs/` directory:

- Component creation guide
- Architecture overview
- Setup and installation instructions
- Scripts for project setup and maintenance

## Additional Resources

- `stories/` directory provides component documentation and examples
- Each component includes usage comments
- JSON data files contain component descriptions and parameters