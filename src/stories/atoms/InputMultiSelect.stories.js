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
    
    {# Add input field for searching/adding new options #}
    <div class="relative mb-2">
      <input 
        type="text" 
        id="{{ name }}-input"
        placeholder="{{ placeholder }}"
        class="w-full p-2 {{ inputClass }}"
        {% if disabled %}disabled{% endif %}
        data-multi-select-input
      />
    </div>
    
    {# Selected options container #}
    <div class="selected-options {{ containerClass }}" data-selected-options-container>
      {% for option in options %}
        <div 
          class="{{ chipClass }}"
          data-option-value="{{ option.value }}"
          role="button"
          tabindex="{% if disabled or option.disabled %}-1{% else %}0{% endif %}"
          {% if disabled or option.disabled %}aria-disabled="true"{% endif %}
        >
          <span class="chip-label">{{ option.label }}</span>
          <button type="button" 
            class="chip-remove ml-1.5 text-gray-500 hover:text-gray-700"
            aria-label="Remove {{ option.label }}"
            {% if disabled or option.disabled %}disabled{% endif %}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      {% endfor %}
    </div>
    
    {# Hidden input for form submission #}
    <input type="hidden" name="{{ name }}_values" id="{{ name }}-values" data-multi-select-values />
  </div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClasses(variant) {
  const foundVariant = inputMultiSelectData.variants.find(v => v.name === variant);
  
  if (!foundVariant) {
    return {
      labelClass: "text-gray-700 font-medium",
      inputClass: "border-gray-300 text-gray-900 rounded-md",
      containerClass: "flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-10",
      chipClass: "flex items-center bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded-md"
    };
  }
  
  return {
    labelClass: foundVariant.label,
    inputClass: `${foundVariant.border} ${foundVariant.input}`,
    containerClass: `flex flex-wrap gap-2 p-2 ${foundVariant.border} min-h-10 ${foundVariant.container}`,
    chipClass: "flex items-center bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded-md"
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
      variant: args.variant,
      disabled: args.disabled,
      required: args.required,
      labelClass: variantClasses.labelClass,
      inputClass: variantClasses.inputClass,
      containerClass: variantClasses.containerClass,
      chipClass: variantClasses.chipClass
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
      defaultValue: 'Type to search...' 
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

// Create examples with sample data
const sampleOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'py', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'ts', label: 'TypeScript' }
];

const characterClassOptions = [
  { value: 'warrior', label: 'Warrior' },
  { value: 'mage', label: 'Mage' },
  { value: 'rogue', label: 'Rogue' },
  { value: 'cleric', label: 'Cleric' },
  { value: 'paladin', label: 'Paladin', disabled: true }
];

const excuseOptions = [
  { value: 'traffic', label: 'Traffic' },
  { value: 'alarm', label: 'Alarm' },
  { value: 'cat', label: 'Cat Chaos' },
  { value: 'coffee', label: 'Coffee Spill' }
];

const cursedItemOptions = [
  { value: 'sword', label: 'Hexed Sword' },
  { value: 'shield', label: 'Haunted Shield' },
  { value: 'amulet', label: 'Corrupted Amulet' }
];

const osOptions = [
  { value: 'linux', label: 'Linux' },
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
  { value: 'bsd', label: 'BSD', disabled: true }
];

// Basic example with default state
export const Default = {
  args: {
    name: 'programming-languages',
    title: 'Programming Languages',
    placeholder: 'Add a language...',
    options: sampleOptions,
    variant: 'default'
  }
};

// Hover state example
export const Hover = {
  args: {
    name: 'programming-languages-hover',
    title: 'Programming Languages',
    placeholder: 'Add a language...',
    options: sampleOptions,
    variant: 'hover'
  }
};

// Focus state example
export const Focus = {
  args: {
    name: 'character-classes',
    title: 'Character Classes',
    placeholder: 'Add a class...',
    options: characterClassOptions,
    variant: 'focus'
  }
};

// Active state example
export const Active = {
  args: {
    name: 'character-classes-active',
    title: 'Character Classes',
    placeholder: 'Add a class...',
    options: characterClassOptions,
    variant: 'active'
  }
};

// Filled state example
export const Filled = {
  args: {
    name: 'late-excuses',
    title: 'Today\'s Excuse',
    placeholder: 'Add an excuse...',
    options: excuseOptions,
    variant: 'filled'
  }
};

// Critical state example
export const Critical = {
  args: {
    name: 'late-excuses-critical',
    title: 'Today\'s Excuse',
    placeholder: 'Add an excuse...',
    options: excuseOptions,
    variant: 'critical'
  }
};

// Disabled state example
export const Disabled = {
  args: {
    name: 'cursed-items',
    title: 'Cursed Items',
    placeholder: 'Can\'t add items...',
    options: cursedItemOptions,
    disabled: true,
    variant: 'disabled'
  }
};

// Required example
export const Required = {
  args: {
    name: 'operating-system',
    title: 'Your OS',
    placeholder: 'Select at least one OS...',
    options: osOptions,
    required: true,
    variant: 'default'
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
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use with chip-multi-select component:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputMultiSelect({
  name: "languages",
  title: "Programming Languages",
  placeholder: "Add a language...",
  options: [
    { value: "js", label: "JavaScript" },
    { value: "py", label: "Python" }
  ],
  variant: "default",
  useChips: true  // Use chip-multi-select component
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available states:</h3>
        <p class="text-gray-600 mb-3">The component supports multiple visual states:</p>
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
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. JavaScript integration:</h3>
        <p class="text-gray-600 mb-3">This component requires the JavaScript from <code>src/js/atoms/input-multi-select.js</code> to handle interaction.</p>
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