# Guide to Component Creation in Hat Dynamic Template

## 🏗️ Component Architecture Overview

### Component Hierarchy

- **Atoms**: Basic building blocks
- **Molecules**: Composed of multiple atoms
- **Organisms**: Complex components combining molecules and/or atoms

## 📁 Recommended Project Structure

```sh
src/
├── _data/                  # Centralized data management
│   ├── components/         # Component-specific data
│   │   ├── button.json
│   │   ├── form-input.json
│   │   └── contact-form.json
│   └── global/             # Global configuration data
│       ├── site.json
│       └── navigation.json
├── _includes/
│   ├── 00-atoms/
│   │   └── [component-type]/
│   │       └── component-name.njk
│   ├── 01-molecules/
│   │   └── [component-type]/
│   │       └── component-name.njk
│   └── 00-organisms/
│       └── [component-type]/
│           └── component-name.njk
└── stories/
    ├── atoms/
    │   └── [component-type]/
    │       └── ComponentName.stories.js
    ├── molecules/
    │   └── [component-type]/
    │       └── ComponentName.stories.js
    └── organisms/
        └── [component-type]/
            └── ComponentName.stories.js
```

## 🗂️ Data Management with JSON

Create a new JSON file for your component in the appropriate directory under `_data/components/`. Use the `new_component.json` template:

```json
{
    "name": "NewComponent",
    "description": "Description of the new component",
    
    "variants": [
      {
        "name": "default",
        "class": "new-component--default",
        "styles": {
          "backgroundColor": "#ffffff",
          "color": "#000000"
        }
      },
      {
        "name": "primary",
        "class": "new-component--primary",
        "styles": {
          "backgroundColor": "#007bff",
          "color": "#ffffff"
        }
      },
      {
        "name": "secondary",
        "class": "new-component--secondary",
        "styles": {
          "backgroundColor": "#6c757d",
          "color": "#ffffff"
        }
      }
    ],
    
    "defaultProps": {
      "variant": "default",
      "disabled": false,
      "size": "medium"
    },
    
    "sizes": [
      "small",
      "medium",
      "large" 
    ],
    
    "accessibility": {
      "ariaRoles": ["button", "link"],
      "keyboardInteractions": ["Enter", "Space"]
    },
    
    "validations": {
      "requiredProps": [],
      "optionalProps": [
        "content",
        "ariaLabel"
      ]
    }
  }
```

Customize the JSON file according to your component's specific data requirements.

## 🧩 Component Creation with Data Integration

Create a new Nunjucks file for your component in the appropriate directory under `_includes/`. Use the `new-component.njk` template:

```nunjucks
{# 
  New Component Macro Template
  
  STEPS TO CUSTOMIZE:
  1. Replace 'NewComponent' with your component's name
  2. Update macro signature and parameters 
  3. Add default options handling
  4. Implement component logic
  5. Add accessibility attributes
  6. Implement optional content/children support
#}

{% macro renderNewComponent(options) %}
  {# 
    Options Structure:
    - content: Main content/text
    - class: Additional CSS classes
    - variant: Component variant (e.g., primary, secondary)
    - attributes: Custom HTML attributes
  #}
  {% set defaults = {
    variant: 'default',
    class: '',
    attributes: {},
    content: ''
  } %}
  
  {# Merge default options with passed options #}
  {% set componentOptions = defaults | merge(options) %}

  {# Load component-specific data #}
  {% set componentData = load_json('_data/components/new-component.json') %}

  <div 
    class="new-component 
      new-component--{{ componentOptions.variant }} 
      {{ componentOptions.class }}"
    
    {# Spread additional attributes #}
    {% for attr, value in componentOptions.attributes %}
      {{ attr }}="{{ value }}"
    {% endfor %}

    {# Optional ARIA attributes for accessibility #}
    {% if componentOptions.ariaLabel %}
      aria-label="{{ componentOptions.ariaLabel }}"
    {% endif %}
  >
    {# Component content rendering #}
    {% if componentOptions.content %}
      <div class="new-component__content">
        {{ componentOptions.content | safe }}
      </div>
    {% endif %}
  </div>
{% endmacro %}

{# 
  Helper macro for JSON loading (if not already defined globally)
  Requires nunjucks-loader or custom implementation 
#}
{% macro load_json(path) %}
  {# Implementation depends on your Eleventy setup #}
  {# Placeholder for JSON loading logic #}
{% endmacro %}
```

Modify the template to match your component's structure and behavior.

## 📖 Storybook Integration

Create a new Storybook story for your component in the appropriate directory under `stories/`. Use the `New-component.stories.js` template:

```javascript
import nunjucks from 'nunjucks';
import newComponentTemplate from '../../_includes/path/to/new-component.njk';
import newComponentData from '../../_data/components/new-component.json';

// 🔧 Storybook Configuration for New Component
export default {
  title: 'Atoms/NewComponent', // Adjust path as needed
  render: (args) => {
    // Render Nunjucks template with Storybook args
    return nunjucks.renderString(
      '{% macro renderComponent(options) %}' + 
      newComponentTemplate +
      '{% endmacro %}' +
      '{{ renderComponent(options) }}',
      { options: { ...newComponentData.defaultProps, ...args } }
    );
  },
  
  // 🎨 Customize Storybook Controls
  argTypes: {
    // Dynamic controls based on component JSON
    variant: {
      control: { 
        type: 'select', 
        options: newComponentData.variants.map(v => v.name) 
      },
      description: 'Visual style variant of the component'
    },
    content: { 
      control: 'text', 
      description: 'Text or HTML content of the component' 
    },
    disabled: { 
      control: 'boolean', 
      description: 'Disable component interaction' 
    },
    size: {
      control: { 
        type: 'select', 
        options: newComponentData.sizes 
      },
      description: 'Size of the component'
    }
  }
};

// 📝 Story Variants

// Default State
export const Default = {
  args: {
    variant: 'default',
    content: 'Default New Component',
    disabled: false
  }
};

// Primary Variant
export const Primary = {
  args: {
    variant: 'primary',
    content: 'Primary New Component',
    disabled: false
  }
};

// Secondary Variant
export const Secondary = {
  args: {
    variant: 'secondary',
    content: 'Secondary New Component',
    disabled: false
  }
};

// Disabled State
export const Disabled = {
  args: {
    variant: 'default',
    content: 'Disabled New Component',
    disabled: true
  }
};

// Large Size
export const LargeSize = {
  args: {
    variant: 'primary',
    content: 'Large New Component',
    size: 'large'
  }
};

// 🧪 Accessibility Story
export const Accessibility = {
  args: {
    variant: 'default',
    content: 'Accessible New Component',
    ariaLabel: 'Accessibility description for screen readers'
  }
};
```

Customize the Storybook story according to your component's props and variants.

## 🚀 JavaScript Enhancement

Create a new JavaScript file for your component in the appropriate directory. Use the `new-component.js` template:

```javascript
/**
 * New Component JavaScript Enhancement
 * 
 * STEPS TO IMPLEMENT:
 * 1. Define component selector
 * 2. Add event listeners
 * 3. Implement core interactions
 * 4. Handle accessibility
 * 5. Add error handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select all new components
    const newComponents = document.querySelectorAll('.new-component');
  
    newComponents.forEach(component => {
      // Keyboard interaction support
      component.addEventListener('keydown', (event) => {
        // Example: Handle Enter and Space keys
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleComponentInteraction(component);
        }
      });
  
      // Optional click handler
      component.addEventListener('click', () => {
        handleComponentInteraction(component);
      });
    });
  
    /**
     * Core interaction logic
     * @param {HTMLElement} component - The component being interacted with
     */
    function handleComponentInteraction(component) {
      try {
        // Add your specific interaction logic here
        // For example:
        component.classList.toggle('is-active');
  
        // Optional: dispatch custom event
        const interactionEvent = new CustomEvent('new-component:interaction', {
          detail: { 
            component: component,
            timestamp: new Date()
          },
          bubbles: true
        });
        component.dispatchEvent(interactionEvent);
      } catch (error) {
        console.error('New Component Interaction Error:', error);
      }
    }
  
    // Optional: Global event listener for custom events
    document.addEventListener('new-component:interaction', (event) => {
      console.log('Component interaction detected:', event.detail);
    });
  });
  
  // Optional: Utility functions
  export function resetNewComponent(componentElement) {
    componentElement.classList.remove('is-active');
  }
  
  export function initializeNewComponent(componentElement) {
    // Additional initialization logic if needed
    componentElement.setAttribute('tabindex', '0');
    componentElement.setAttribute('role', 'button');
  }
```

Implement the necessary JavaScript enhancements for your component.

## 🔍 Benefits of JSON-Driven Components

1. **Centralized Configuration**
   - Single source of truth for component data
   - Easy to update and maintain

2. **Flexible Customization**
   - Default props and styles can be easily overridden
   - Support for multiple variants

3. **Enhanced Reusability**
   - Components can be configured dynamically
   - Consistent styling across the application

## 💡 Advanced Techniques

### Dynamic Data Loading

## 🚀 Implementation Workflow

1. Define component data in JSON
2. Create flexible Nunjucks macro
3. Develop Storybook stories
4. Implement variants
5. Test and refine

## 🎯 Best Practices

- Keep JSON files lean and focused
- Use descriptive keys
- Leverage default props
- Document data structure
- Validate JSON schemas

## 🛡️ Data Validation (Optional)

Consider using JSON Schema for strict validation:

- Ensure data integrity
- Catch configuration errors early
- Provide clear error messages

## 📦 Example Integration

### How to Import and Use a Macro in a Nunjucks Template

To correctly import and use a macro in a Nunjucks template, follow these steps:

1. **Import the macro** at the top of your page:  

   ```nunjucks
   {% from "02-atoms-navigation/link.njk" import renderLink %}

2. **Insert the component** into your template using the imported macro and the appropriate JSON data:

   ```nunjucks
   {{ renderLink(links.link_home) }}

Make sure to replace link.njk with the correct component file and links.link_home with the corresponding JSON data you want to use.

## 🔧 Tooling Recommendations

- Use JSON linters
- Implement JSON schema validation
- Consider using TypeScript for stronger typing
- Use VS Code extensions for JSON schema support

## 🚧 Potential Challenges

- Performance overhead of dynamic data loading
- Complexity in deeply nested configurations
- Keeping data and templates in sync

## 📝 Final Recommendations

- Start simple, evolve gradually
- Keep components decoupled
- Prioritize readability
- Document your approach
- Continuously refactor
