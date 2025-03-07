// src/stories/atoms/Select.stories.js
import nunjucks from 'nunjucks';
import selectData from '../../_data/styles/atoms/select.json';
import selectsData from '../../_data/contents/atoms/selects.json';

// Nunjucks template for rendering selects
const selectTemplate = `
  <div class="mt-6 mb-6 mx-auto">
    <select name="{{ name }}" class="select select--{{ variant }} {{ variantClass }}">
      {% for option in options %}
        <option value="{{ option.value }}"{% if option.selected %} selected{% endif %}>{{ option.label }}</option>
      {% endfor %}
    </select>
  </div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = selectData.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class.replace(`select--${variant}`, '').trim() : '';
}

export default {
  title: 'Atoms/Select',
  tags: ['autodocs'],
  
  // Render function using Nunjucks template
  render: (args) => {
    return nunjucks.renderString(selectTemplate, {
      name: args.name,
      options: args.options,
      variant: args.variant,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'HTML name attribute for the select element',
      control: 'text',
      defaultValue: 'select-name' 
    },
    options: { 
      description: 'Array of option objects with value and label properties',
      control: 'object'
    },
    variant: { 
      description: 'Visual style of the select',
      control: { 
        type: 'select', 
        options: selectData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from selects.json
const selectExamples = selectsData.select_data;

export const Categories = {
  args: {
    name: selectExamples.categories.name,
    options: selectExamples.categories.options,
    variant: selectExamples.categories.variant
  }
};

export const Locations = {
  args: {
    name: selectExamples.locations.name,
    options: selectExamples.locations.options,
    variant: selectExamples.locations.variant
  }
};

export const Difficulties = {
  args: {
    name: selectExamples.difficulties.name,
    options: selectExamples.difficulties.options,
    variant: selectExamples.difficulties.variant
  }
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/select.njk" import renderSelect %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSelect(selects.select_data.categories) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use with custom options directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSelect({
  name: "custom-select",
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2", selected: true }
  ],
  variant: "primary"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/selects.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/select.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to selects.json:</h4>
          <pre><code class="text-sm text-gray-900">"your_new_select": {
  "name": "your-select",
  "options": [
    { "value": "option1", "label": "Option 1" },
    { "value": "option2", "label": "Option 2", "selected": true }
  ],
  "variant": "primary"
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to select.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": [
  {
    "name": "your_new_variant",
    "class": "select--custom bg-green-50 text-green-600 border-green-300"
  }
]</code></pre>
        </div>
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