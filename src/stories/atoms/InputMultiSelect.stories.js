// src/stories/atoms/InputMultiSelect.stories.js
import nunjucks from 'nunjucks';
import inputMultiSelectData from '../../_data/styles/atoms/input_multi_select.json';

// Nunjucks template for rendering input multi-select
const inputMultiSelectTemplate = `
  <div class="input-multi-select" data-multi-select-container id="{{ name }}-container">
    {% if title %}
      <label for="{{ name }}-input" class="block text-sm font-medium {{ labelClass }} mb-2">
        {{ title }}{% if required %} *{% endif %}
      </label>
    {% endif %}
    
    <div class="relative flex flex-wrap items-center p-2 min-h-[42px] {{ containerClass }}" data-chip-container>
      {% for option in options %}
        <div 
          class="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded-md mr-1 mb-1"
          data-option-value="{{ option.value }}"
          role="button"
          tabindex="{% if disabled or option.disabled %}-1{% else %}0{% endif %}"
          {% if disabled or option.disabled %}aria-disabled="true"{% endif %}
          data-default-class="bg-blue-100 text-blue-800"
          data-hover-class="bg-blue-200 text-blue-900"
          data-focus-class="bg-blue-100 text-blue-800 ring-2 ring-blue-400"
          data-disabled-class="bg-gray-100 text-gray-400 opacity-60"
          data-state="default"
        >
          <span class="chip-label">{{ option.label }}</span>
          <button type="button" 
            class="chip-remove ml-1 text-blue-500 hover:text-blue-700"
            aria-label="Remove {{ option.label }}"
            {% if disabled or option.disabled %}disabled{% endif %}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      {% endfor %}
      
      <input 
        type="text" 
        id="{{ name }}-input"
        placeholder="{{ placeholder }}"
        class="flex-grow min-w-[120px] border-none focus:ring-0 focus:outline-none bg-transparent {{ inputClass }}"
        {% if disabled %}disabled{% endif %}
        readonly
      />
      
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
    
    <input type="hidden" name="{{ name }}_values" id="{{ name }}-values" data-multi-select-values />
  </div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClasses(variant) {
  const foundVariant = inputMultiSelectData.variants.find(v => v.name === variant);
  
  if (!foundVariant) {
    return {
      labelClass: "text-gray-700 font-medium",
      inputClass: "",
      containerClass: "border border-gray-300 rounded-md"
    };
  }
  
  return {
    labelClass: foundVariant.label,
    inputClass: foundVariant.input || "",
    containerClass: foundVariant.border || "border border-gray-300 rounded-md"
  };
}

export default {
  title: 'Atoms/InputMultiSelect',
  tags: ['autodocs'],
  
  // Render function using Nunjucks
  render: (args) => {
    const variantClasses = getVariantClasses(args.variant);
    
    return nunjucks.renderString(inputMultiSelectTemplate, {
      name: args.name,
      title: args.title,
      placeholder: args.placeholder,
      options: args.options,
      disabled: args.disabled,
      required: args.required,
      labelClass: variantClasses.labelClass,
      inputClass: variantClasses.inputClass,
      containerClass: variantClasses.containerClass
    });
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Unique identifier for the component',
      control: 'text',
      defaultValue: 'multi-select' 
    },
    title: { 
      description: 'Label text for the input',
      control: 'text',
      defaultValue: 'Select options' 
    },
    placeholder: { 
      description: 'Placeholder text for input field',
      control: 'text',
      defaultValue: 'Select options...' 
    },
    options: { 
      description: 'Array of selectable options',
      control: 'object',
      defaultValue: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
    },
    disabled: { 
      description: 'Whether the input is disabled',
      control: 'boolean',
      defaultValue: false 
    },
    required: { 
      description: 'Whether the input is required',
      control: 'boolean',
      defaultValue: false 
    },
    variant: { 
      description: 'Visual style variant',
      control: { 
        type: 'select', 
        options: inputMultiSelectData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

export const Default = {
  args: {
    name: 'input-multi-select-default',
    title: 'Programming Languages',
    placeholder: 'Select languages...',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'py', label: 'Python' }
    ],
    variant: 'default'
  }
};

export const Hover = {
  args: {
    name: 'input-multi-select-hover',
    title: 'Programming Languages',
    placeholder: 'Select languages...',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'py', label: 'Python' }
    ],
    variant: 'hover'
  }
};

export const Focus = {
  args: {
    name: 'input-multi-select-focus',
    title: 'Programming Languages',
    placeholder: 'Select languages...',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'py', label: 'Python' }
    ],
    variant: 'focus'
  }
};

export const Disabled = {
  args: {
    name: 'input-multi-select-disabled',
    title: 'Programming Languages',
    placeholder: 'Selection disabled',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'py', label: 'Python' }
    ],
    disabled: true,
    variant: 'disabled'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/input-multi-select.njk" import renderInputMultiSelect %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputMultiSelect(input_multi_selects.data.programming_languages) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Custom implementation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputMultiSelect({
  name: "languages",
  title: "Programming Languages",
  placeholder: "Select languages...",
  options: [
    { value: "js", label: "JavaScript" },
    { value: "py", label: "Python" }
  ],
  variant: "default",
  required: true
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available variants:</h3>
        <p class="text-gray-600 mb-3">The component supports multiple visual styles:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li><code>default</code> - Standard appearance</li>
          <li><code>hover</code> - When hovering over the component</li>
          <li><code>focus</code> - When the component is focused</li>
          <li><code>active</code> - When the component is active</li>
          <li><code>filled</code> - When options are selected</li>
          <li><code>critical</code> - For error states</li>
          <li><code>disabled</code> - When the component is disabled</li>
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