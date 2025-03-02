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