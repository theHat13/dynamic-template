# HAT Components Structure

This document explains the organization of components in the HAT Dynamic Template project according to the OMA (Organism-Molecule-Atom) architecture.

## Overview

Each component consists of several files distributed across different directories:

1. **Nunjucks Component** (`.njk`) - The component template
2. **Styles** (`.json`) - Component variants and styles
3. **Content** (`.json`) - Content data for the component
4. **Storybook Documentation** (`.stories.js`) - Component tests and documentation

## Directory Structure

```sh
project/
├── src/
│   ├── _includes/
│   │   ├── 00-core/
│   │   │       └── core-name.njk
│   │   ├── 01-organisms/
│   │   │       └── organism-name.njk
│   │   ├── molecules/
│   │   │       └── molecule-name.njk
│   │   └── atoms/
│   │           └── atom-name.njk
│   ├── _data/
│   │   ├── styles/
│   │   │   ├── atoms/
│   │   │   │   └── atom-name.json
│   │   │   ├── molecules/
│   │   │   │   └── molecule-name.json
│   │   │   └── organisms/
│   │   │       └── organism-name.json
│   │   └── contents/
│   │       ├── atoms/
│   │       │   └── atom-names.json (plural)
│   │       ├── molecules/
│   │       │   └── molecule-names.json (plural)
│   │       └── organisms/
│   │           └── organism-names.json (plural)
└── stories/
    ├── atoms/
    │       └── AtomName.stories.js
    ├── molecules/
    │       └── MoleculeName.stories.js
    └── organisms/
            └── OrganismName.stories.js
```

## File Descriptions

### 1. Nunjucks Component (`.njk`)

This file contains the component macro that defines its HTML structure.

**Example** (`src/_includes/atoms/button.njk`):

```njk
<!-- ========================= -->
<!--           BUTTON         -->
<!-- ========================= -->

{% macro renderButton(option) %}
  {# Get button options with default values if not provided #}
  {% set href = option.href | default('#') %}
  {% set text = option.text | default('Button') %}
  {% set variant = option.variant | default(button.defaultProps.variant) %}
  
  <button 
    class="btn btn--{{ variant }} {{ button.variants[variant].class }}"
  >
    {{ text }}
  </button>
{% endmacro %}

<!-- ========================= -->
<!-- HOW TO USE THIS COMPONENT -->
<!-- ========================= -->

<!--
  Basic usage: {% from "atoms/button.njk" import renderButton %}
              {{ renderButton(buttons.button_data.primary_button) }}
-->
```

### 2. Styles (`.json`)

This file defines the different variants and styles of the component.

**Example** (`src/_data/styles/atoms/button.json`):

```json
{
  "name": "Button",
  "description": "Interactive button component with multiple style variants",
  "variants": [
    {
      "name": "primary",
      "class": "bg-black hover:bg-white text-white hover:text-black border border-current"
    },
    {
      "name": "secondary",
      "class": "bg-white hover:bg-gray-100 text-black border border-current"
    }
  ],
  "defaultProps": {
    "variant": "primary"
  },
  "accessibility": {
    "roles": ["button"],
    "keyboardInteractions": ["Enter", "Space"]
  }
}
```

### 3. Content (`.json`)

This file stores content data for the component.

**Example** (`src/_data/contents/atoms/buttons.json`):

```json
{
  "component": "button",
  "summary": "An interactive button for user actions",
  "button_data": {
    "primary_button": {
      "text": "Get Started",
      "variant": "primary"
    },
    "secondary_button": {
      "text": "Learn More",
      "variant": "secondary"
    }
  }
}
```

### 4. Storybook Documentation (`.stories.js`)

This file defines the component tests and documentation in Storybook.

**Example** (`stories/atoms/Button.stories.js`):

```javascript
// stories/atoms/Button.stories.js
import nunjucks from 'nunjucks';
import buttonData from '../../_data/styles/atoms/button.json';
import buttonsData from '../../_data/contents/atoms/buttons.json';

// Nunjucks template for rendering buttons
const buttonTemplate = `
  <button 
    class="btn btn--{{ variant }} {{ variantClass }}"
  >
    {{ text }}
  </button>
`;

export default {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  
  render: (args) => {
    return nunjucks.renderString(buttonTemplate, {
      text: args.text,
      variant: args.variant,
      variantClass: buttonData.variants.find(v => v.name === args.variant)?.class || ''
    });
  },
  
  argTypes: {
    text: { 
      description: 'Button text content',
      control: 'text',
      defaultValue: 'Button' 
    },
    variant: { 
      description: 'Visual style of the button',
      control: { 
        type: 'select', 
        options: buttonData.variants.map(v => v.name)
      },
      defaultValue: 'primary'
    }
  }
};

// Using examples from buttons.json
export const Primary = {
  args: {
    text: buttonsData.button_data.primary_button.text,
    variant: buttonsData.button_data.primary_button.variant
  }
};

export const Secondary = {
  args: {
    text: buttonsData.button_data.secondary_button.text,
    variant: buttonsData.button_data.secondary_button.variant
  }
};

// Add a Usage guide
export const Usage = () => {
  // Documentation component here...
};
```

## Naming Conventions

- **Directories**: Use either semantic names or numeric prefix (`00-`, `01-`) to indicate OMA level
- **Nunjucks Files**: Kebab-case (`button-link.njk`)
- **Style JSON Files**: Kebab-case (`button.json`)
- **Content JSON Files**: Kebab-case plural (`buttons.json`)
- **Stories Files**: PascalCase (`Button.stories.js`)

## Creating a New Component

To create a new component, you need to create these four files in their respective directories, following the OMA architecture and naming conventions.

## Using a Component

To use a component in a template, import the Nunjucks macro and use it with the appropriate content data:

```njk
{% from "atoms/button.njk" import renderButton %}
{{ renderButton(buttons.button_data.primary_button) }}
```

## Modifying an Existing Component

To modify an existing component, update the corresponding files:

1. Modify the HTML structure in the `.njk` file
2. Add/modify styles in the styles JSON file
3. Add/modify data in the content JSON file
4. Update documentation in the `.stories.js` file