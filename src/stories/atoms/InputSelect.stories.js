// src/stories/atoms/InputSelect.stories.js
import nunjucks from 'nunjucks';
import inputSelectData from '../../_data/styles/atoms/input_select.json';
import inputSelectsData from '../../_data/contents/atoms/input_selects.json';

// Nunjucks template for rendering input selects
const inputSelectTemplate = `
  <div>
    <label for="{{ name }}" class="block typography-label-l">
      {{ label }} {% if required %}*{% endif %}
    </label>

    <div class="relative mt-1.5">
      <input 
        type="text" 
        list="{{ name }}List" 
        id="{{ name }}" 
        name="{{ name }}" 
        class="input-select input-select--{{ variant }} {{ variantClass }}" 
        placeholder="{{ placeholder }}"
        {% if required %}required{% endif %}
      />

      <datalist id="{{ name }}List">
        {% for option in options %}
          <option value="{{ option.value }}">{{ option.label }}</option>
        {% endfor %}
      </datalist>
    </div>
  </div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = inputSelectData.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class.replace(`input-select--${variant}`, '').trim() : '';
}

export default {
  title: 'Atoms/InputSelect',
  tags: ['autodocs'],
  
  // Render function using Nunjucks template
  render: (args) => {
    return nunjucks.renderString(inputSelectTemplate, {
      name: args.name,
      label: args.label,
      placeholder: args.placeholder,
      options: args.options,
      required: args.required,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'HTML name and id attribute for the input element',
      control: 'text',
      defaultValue: 'select-default' 
    },
    label: {
      description: 'Label text displayed above the input',
      control: 'text',
      defaultValue: 'Label'
    },
    placeholder: { 
      description: 'Placeholder text displayed when empty',
      control: 'text',
      defaultValue: 'Select an option...' 
    },
    options: { 
      description: 'Array of option objects with value and label properties',
      control: 'object'
    },
    required: {
      description: 'Whether the field is required',
      control: 'boolean',
      defaultValue: false
    },
    variant: { 
      description: 'Visual style of the select component',
      control: { 
        type: 'select', 
        options: inputSelectData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from input_selects.json
const selectExamples = inputSelectsData.select_data;

export const Default = {
  args: {
    name: selectExamples.programming_languages.name,
    label: selectExamples.programming_languages.label,
    placeholder: selectExamples.programming_languages.placeholder,
    options: selectExamples.programming_languages.options,
    variant: "default"
  }
};

export const Primary = {
  args: {
    name: selectExamples.gaming_consoles.name,
    label: selectExamples.gaming_consoles.label,
    placeholder: selectExamples.gaming_consoles.placeholder,
    options: selectExamples.gaming_consoles.options,
    variant: "primary"
  }
};

export const Secondary = {
  args: {
    name: selectExamples.mythical_creatures.name,
    label: selectExamples.mythical_creatures.label,
    placeholder: selectExamples.mythical_creatures.placeholder,
    options: selectExamples.mythical_creatures.options,
    variant: "secondary"
  }
};

export const Small = {
  args: {
    name: selectExamples.sci_fi_ships.name,
    label: selectExamples.sci_fi_ships.label,
    placeholder: selectExamples.sci_fi_ships.placeholder,
    options: selectExamples.sci_fi_ships.options,
    variant: "small"
  }
};

export const Large = {
  args: {
    name: selectExamples.character_classes.name,
    label: selectExamples.character_classes.label,
    placeholder: selectExamples.character_classes.placeholder,
    options: selectExamples.character_classes.options,
    required: selectExamples.character_classes.required,
    variant: "large"
  }
};

// Generate a usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/input-select.njk" import renderInputSelect %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputSelect(input_selects.select_data.character_classes) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom configuration directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputSelect({
  name: "custom-select",
  label: "Custom Label",
  placeholder: "Select something...",
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ],
  variant: "primary",
  required: true
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/input_selects.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/input_select.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to input_selects.json:</h4>
          <pre><code class="text-sm text-gray-900">"select_data": {
  "your_new_select": {
    "name": "new_select_name",
    "label": "Your Custom Label",
    "placeholder": "Select an option...",
    "options": [
      { "value": "option1", "label": "Option 1" },
      { "value": "option2", "label": "Option 2" }
    ],
    "variant": "default",
    "required": false
  }
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to input_select.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": [
  {
    "name": "your_new_variant",
    "class": "input-select--custom w-full p-2 text-purple-700 bg-purple-50 border border-purple-300 rounded-md"
  }
]</code></pre>
        </div>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Key advantages of datalist-based selects:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Allows users to type to search for options</li>
          <li>Combines the benefits of both select and text input</li>
          <li>More accessible for entering custom values when needed</li>
          <li>Supports longer option descriptions without UI constraints</li>
          <li>Mobile-friendly interface with native keyboard support</li>
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