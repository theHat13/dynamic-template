# Component Creation Guide

## 1. File Structure

For each new component (example with "Button"):

- `src/_data/components/button.json` - Component data
- `src/_includes/00-atoms/buttons/button.njk` - Nunjucks template
- `src/input.css` - Add CSS styles for the component
- `src/js/components/button.js` - JavaScript for interactions (optional)
- `stories/atoms/buttons/Button.stories.js` - Storybook stories (if used)
- `stories/atoms/buttons/Button.mdx` - Storybook documentation (if used)

## 2. JSON Template

```json
{
  "name": "ComponentName",
  "description": "Component description",
  "variants": [
    {
      "name": "default",
      "class": "component-name--default"
    },
    {
      "name": "primary",
      "class": "component-name--primary"
    }
  ],
  "defaultProps": {
    "variant": "default",
    "content": ""
  }
}
```

## 3. Nunjucks Template

```njk
{% macro renderComponentName(options) %}
  {% set defaults = {
    variant: 'default',
    content: '',
    class: ''
  } %}
  
  {% set componentOptions = defaults | merge(options) %}
  
  <div class="component-name component-name--{{ componentOptions.variant }} {{ componentOptions.class }}">
    {{ componentOptions.content | safe }}
  </div>
{% endmacro %}
```

## 4. CSS Template

```css
/* Component styles */
.component-name {
  /* Base styles */
}

.component-name--default {
  /* Default variant */
}

.component-name--primary {
  /* Primary variant */
}
```

## 5. JavaScript Template (optional)

```javascript
// src/js/components/component-name.js
document.addEventListener('DOMContentLoaded', () => {
  // Select all components
  const components = document.querySelectorAll('.component-name');
  
  components.forEach(component => {
    // Add event listeners
    component.addEventListener('click', (event) => {
      // Action on click
    });
    
    // Handle accessibility
    component.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        // Action on Enter or Space key press
        event.preventDefault();
        // Simulate click
        component.click();
      }
    });
  });
});

// Utility functions (exported for use elsewhere)
export function initializeComponent(element) {
  // Initialization logic
}
```

## 6. Storybook Stories Template

```javascript
// stories/atoms/component-name/ComponentName.stories.js
import nunjucks from 'nunjucks';
import componentTemplate from '../../../_includes/path/to/component-name.njk';
import componentData from '../../../_data/components/component-name.json';

export default {
  title: 'Atoms/ComponentCategory/ComponentName',
  
  render: (args) => {
    return nunjucks.renderString(
      '{% macro renderComponentName(options) %}' + 
      componentTemplate +
      '{% endmacro %}' +
      '{{ renderComponentName(options) }}',
      { options: { ...componentData.defaultProps, ...args } }
    );
  },
  
  argTypes: {
    variant: {
      control: { 
        type: 'select', 
        options: componentData.variants.map(v => v.name) 
      },
      description: 'Visual style of the component'
    },
    content: { 
      control: 'text', 
      description: 'Component content' 
    }
  }
};

// Default variant
export const Default = {
  args: {
    variant: 'default',
    content: 'Default component'
  }
};

// Primary variant
export const Primary = {
  args: {
    variant: 'primary',
    content: 'Primary component'
  }
};
```

## 7. MDX Documentation Template

```mdx
// stories/atoms/component-name/ComponentName.mdx
import { Meta, Canvas, Story } from '@storybook/addon-docs';
import * as ComponentStories from './ComponentName.stories';

<Meta title="Atoms/ComponentCategory/ComponentName/Documentation" />

# ComponentName Component

The ComponentName component is used for [description].

## Basic Usage

<Canvas>
  <Story story={ComponentStories.Default} />
</Canvas>

## Variants

### Primary

<Canvas>
  <Story story={ComponentStories.Primary} />
</Canvas>

## Properties

| Property   | Type    | Description                | Default    | Required |
|------------|---------|----------------------------|------------|----------|
| variant    | string  | Visual style of component  | "default"  | No       |
| content    | string  | Main content               | ""         | Yes      |
| class      | string  | Additional CSS classes     | ""         | No       |

## Accessibility

- Keyboard navigable
- Screen reader compatible
- Color contrast compliant with WCAG 2.1 AA
```

## 8. How to Use the Component

To correctly import and use a macro in a Nunjucks template, follow these steps:

1. **Import the macro** at the top of your page:  

   ```nunjucks
   {% from "02-atoms/button.njk" import renderButton %}
   ```

   **Insert the component** into your template using the imported macro and the appropriate JSON data:

```{{ renderButton(buttons.button_home) }}
```

Make sure to replace button.njk with the correct component file and buttons.button_home with the corresponding JSON data you want to use.
