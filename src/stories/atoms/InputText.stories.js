// src/stories/atoms/InputText.stories.js
import nunjucks from 'nunjucks';
import inputTextData from '../../_data/styles/atoms/input_text.json';
import inputTextsData from '../../_data/contents/atoms/input_texts.json';

// Nunjucks template for rendering input text fields
const inputTextTemplate = `
<div class="mb-4">
  <label 
    for="{{ id }}" 
    class="block mb-2 {{ labelClass }}"
  >
    {{ label }} {% if required %}*{% endif %}
  </label>
  
  <input 
    type="text" 
    id="{{ id }}" 
    name="{{ name }}"
    placeholder="{{ placeholder }}" 
    value="{{ value }}"
    class="w-full 
      {{ borderClass }} 
      {{ paddingClass }} 
      {{ typographyClass }}
      {{ inputClass }}"
    {% if variant == "disabled" %}disabled{% endif %}
  />
  
  {% if variant == "critical" and errorMessage %}
  <p class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  {% endif %}
</div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClasses(variant) {
  const foundVariant = inputTextData.variants.find(v => v.name === variant);
  
  if (!foundVariant) {
    return {
      labelClass: "",
      inputClass: ""
    };
  }
  
  return {
    labelClass: foundVariant.label,
    inputClass: foundVariant.input,
    containerClass: foundVariant.container
  };
}

export default {
  title: 'Atoms/InputText',
  tags: ['autodocs'],
  
  // Render function using Nunjucks template
  render: (args) => {
    const variantClasses = getVariantClasses(args.variant);
    
    return nunjucks.renderString(inputTextTemplate, {
      id: args.id,
      name: args.name,
      label: args.label,
      placeholder: args.placeholder,
      value: args.value,
      required: args.required,
      errorMessage: args.errorMessage,
      variant: args.variant,
      labelClass: variantClasses.labelClass,
      inputClass: variantClasses.inputClass,
      borderClass: inputTextData.states.border,
      paddingClass: inputTextData.states.padding,
      typographyClass: inputTextData.states.typography
    });
  },
  
  // Argument types for storybook controls
  argTypes: {
    id: { 
      description: 'Unique identifier for the input',
      control: 'text',
      defaultValue: 'input-id' 
    },
    name: { 
      description: 'Name attribute for form submission',
      control: 'text',
      defaultValue: 'input-name' 
    },
    label: { 
      description: 'Text label for the input field',
      control: 'text',
      defaultValue: 'Input Label' 
    },
    placeholder: { 
      description: 'Placeholder text shown when empty',
      control: 'text',
      defaultValue: 'Enter text here...' 
    },
    value: { 
      description: 'Current value of the input',
      control: 'text',
      defaultValue: '' 
    },
    required: { 
      description: 'Whether the field is required',
      control: 'boolean',
      defaultValue: false 
    },
    errorMessage: { 
      description: 'Error message to show (only for critical variant)',
      control: 'text',
      defaultValue: '' 
    },
    variant: { 
      description: 'Visual style of the input',
      control: { 
        type: 'select', 
        options: inputTextData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Create examples using character data from input_texts.json
const foolsOfFate = inputTextsData.fools_of_fate[0];
const legendaryHero = inputTextsData.legendary_heroes[0];

export const Default = {
  args: {
    id: 'character-name',
    name: 'character-name',
    label: 'Character Name',
    placeholder: 'Enter your character name',
    variant: 'default'
  }
};

export const Filled = {
  args: {
    id: 'character-filled',
    name: 'character-filled',
    label: 'Character Name',
    value: foolsOfFate.label,
    variant: 'filled'
  }
};

export const Required = {
  args: {
    id: 'character-required',
    name: 'character-required',
    label: 'Character Name',
    placeholder: 'Your character name is required',
    required: true,
    variant: 'default'
  }
};

export const Focus = {
  args: {
    id: 'character-focus',
    name: 'character-focus',
    label: 'Character Name',
    placeholder: 'Type your character name',
    variant: 'focus'
  }
};

export const Error = {
  args: {
    id: 'character-error',
    name: 'character-error',
    label: 'Character Name',
    value: 'X',
    errorMessage: 'Character name must be at least 3 characters long',
    variant: 'critical'
  }
};

export const Disabled = {
  args: {
    id: 'character-disabled',
    name: 'character-disabled',
    label: 'Character Name',
    value: legendaryHero.label,
    placeholder: 'This field is disabled',
    variant: 'disabled'
  }
};

// Usage guide for the InputText component
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-atoms/input-text.njk" import renderInputText %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Basic usage:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputText(
  id="username",
  name="username", 
  label="Username"
) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Advanced usage with all parameters:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputText(
  id="email",
  name="email", 
  label="Email Address",
  variant="focus",
  placeholder="Enter your email",
  value="user@example.com",
  required=true,
  errorMessage="Please enter a valid email"
) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available variants:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li><code>default</code> - Standard input appearance</li>
          <li><code>hover</code> - When the user hovers over the input</li>
          <li><code>focus</code> - When the input is focused</li>
          <li><code>active</code> - When the input is active</li>
          <li><code>filled</code> - When the input contains a value</li>
          <li><code>critical</code> - For validation errors (include errorMessage)</li>
          <li><code>disabled</code> - When the input is disabled</li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Reference files:</h3>
        <p class="text-gray-600 mb-3">Check these files for more details:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Component: <code>src/_includes/02-atoms-form/input-text.njk</code></li>
          <li>Styles: <code>src/_data/styles/atoms/input_text.json</code></li>
          <li>Content examples: <code>src/_data/contents/atoms/input_texts.json</code></li>
        </ul>
      </div>
    </div>
  `;
  
  return usageGuide;
};

Usage.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
  docs: {
    source: {
      code: null
    }
  }
};