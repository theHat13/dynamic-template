// src/stories/atoms/ChipMultiSelect.stories.js
import nunjucks from 'nunjucks';
import chipMultiSelectData from '../../_data/styles/atoms/chip_multi_select.json';
import chipMultiSelectsData from '../../_data/contents/atoms/chip_multi_selects.json';

// Nunjucks template for rendering a chip group
const chipGroupTemplate = `
  <div class="space-y-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">{{ title }}</label>
    <div class="{{ containerClass }}">
      {% for option in options %}
        <div 
          class="{{ chipClass }} {% if stateOverride %}{{ stateClass }}{% else %}{% if option.disabled %}{{ disabledClass }}{% else %}{{ defaultClass }}{% endif %}{% endif %}" 
          role="button" 
          tabindex="{% if stateOverride == 'disabled' or option.disabled or groupDisabled %}-1{% else %}0{% endif %}"
          {% if stateOverride == 'disabled' or option.disabled or groupDisabled %}aria-disabled="true"{% endif %}
        >
          <span>{{ option.label }}</span>
          <button type="button" class="chip-remove {{ removeIconClass }}" aria-label="Remove {{ option.label }}" {% if stateOverride == 'disabled' or option.disabled or groupDisabled %}disabled{% endif %}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      {% endfor %}
    </div>
  </div>
`;

// Helper function to get chip styles from the JSON data
function getChipClasses(variant = 'default') {
  const variantData = chipMultiSelectData.variants[variant] || chipMultiSelectData.variants.default;
  
  return {
    containerClass: variantData.container,
    baseClass: variantData.chip.base,
    defaultClass: variantData.chip.default,
    hoverClass: variantData.chip.hover,
    focusClass: variantData.chip.focus,
    disabledClass: variantData.chip.disabled,
    removeIconClass: variantData.chip.removeIcon
  };
}

// Get the example data from the JSON
const chipExamples = chipMultiSelectsData.chip_multi_select_data;

export default {
  title: 'Atoms/ChipMultiSelect',
  tags: ['autodocs'],
  
  // Render function using Nunjucks template
  render: (args) => {
    const chipClasses = getChipClasses();
    const exampleData = chipExamples[args.exampleKey];
    
    if (!exampleData) {
      return '<div>Error: Example data not found</div>';
    }
    
    let stateClass = null;
    if (args.state === 'default') stateClass = chipClasses.defaultClass;
    if (args.state === 'hover') stateClass = `${chipClasses.defaultClass} ${chipClasses.hoverClass}`;
    if (args.state === 'focus') stateClass = `${chipClasses.defaultClass} ${chipClasses.focusClass}`;
    if (args.state === 'disabled') stateClass = chipClasses.disabledClass;
    
    return nunjucks.renderString(chipGroupTemplate, {
      title: exampleData.title,
      options: exampleData.options,
      containerClass: chipClasses.containerClass,
      chipClass: chipClasses.baseClass,
      defaultClass: chipClasses.defaultClass,
      disabledClass: chipClasses.disabledClass,
      removeIconClass: chipClasses.removeIconClass,
      stateOverride: args.state,
      stateClass: stateClass,
      groupDisabled: exampleData.disabled || false
    });
  },
  
  // Argument types for storybook controls
  argTypes: {
    exampleKey: { 
      description: 'Example data set to use',
      control: { 
        type: 'select', 
        options: Object.keys(chipExamples)
      }
    },
    state: { 
      description: 'Visual state to apply to all chips',
      control: { 
        type: 'select', 
        options: ['default', 'hover', 'focus', 'disabled']
      }
    }
  }
};

// Examples for each state using different categories
export const Default = {
  args: {
    exampleKey: 'rpg_classes',
    state: 'default'
  }
};

export const Hover = {
  args: {
    exampleKey: 'rpg_races',
    state: 'hover'
  }
};

export const Focus = {
  args: {
    exampleKey: 'rpg_weapons',
    state: 'focus'
  }
};

export const Disabled = {
  args: {
    exampleKey: 'rpg_cursed_items',
    state: 'disabled'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/chip-multi-select.njk" import renderChipMultiSelect %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipMultiSelect(chip_multi_selects.chip_multi_select_data.rpg_classes) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use with custom options directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipMultiSelect({
  name: "custom-chips",
  title: "Custom Chip Group",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2", disabled: true }
  ],
  variant: "default"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/chip_multi_selects.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/chip_multi_select.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to chip_multi_selects.json:</h4>
          <pre><code class="text-sm text-gray-900">"chip_multi_select_data": {
  "your_new_chips": {
    "name": "unique_name",
    "title": "Your Chip Group",
    "options": [
      { "label": "Option 1", "value": "option1" },
      { "label": "Option 2", "value": "option2", "disabled": true }
    ],
    "variant": "default"
  }
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to chip_multi_select.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": {
  "your_new_variant": {
    "container": "flex flex-wrap gap-2 my-2 p-2 border border-dashed border-green-500 rounded-md",
    "chip": {
      "base": "flex items-center justify-between px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
      "default": "bg-green-100 text-green-700 border border-transparent",
      "hover": "bg-green-200 text-green-800",
      "focus": "border border-green-500 outline-none ring-0",
      "disabled": "bg-gray-100 text-gray-400 opacity-70 cursor-not-allowed",
      "removeIcon": "ml-1.5 text-green-500 hover:text-green-700"
    }
  }
}</code></pre>
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