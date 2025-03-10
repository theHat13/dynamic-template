// src/stories/atoms/InputMultiSelect.stories.js
import nunjucks from 'nunjucks';
import inputMultiSelectData from '../../_data/styles/atoms/input_multi_select.json';
import chipMultiSelectsData from '../../_data/contents/atoms/chip_multi_selects.json';

// Nunjucks template for rendering input multi-select
const inputMultiSelectTemplate = `
  <div class="w-80 p-4">
    <label 
      for="demo-{{ name }}" 
      class="block mb-2 text-sm font-medium 
             {% if variant == 'critical' %}text-red-600{% else %}text-gray-700{% endif %}"
    >
      Label {% if variant == 'critical' %}* Error{% endif %}
    </label>
    
    <div class="relative">
      <div class="w-full px-3 py-2 border rounded-md flex flex-wrap gap-2 
                  {% if options and options.length > 0 %}min-h-[42px]{% endif %}
                  {{ variantClasses }} 
                  {% if variant == 'critical' %}border-red-500 text-red-900{% endif %}
                  {% if variant == 'disabled' %}bg-gray-100 cursor-not-allowed{% endif %}">
        
        {% if options and options.length > 0 %}
          {% for option in options %}
            {% if option.selected %}
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs 
                           bg-blue-100 text-blue-700 space-x-1">
                {{ option.label }}
                <button type="button" class="ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            {% endif %}
          {% endfor %}
        {% else %}
          <span class="text-gray-400">Label</span>
        {% endif %}
      </div>
      
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    {% if variant == 'critical' %}
      <p class="mt-1 text-sm text-red-600">
        <span class="font-bold">!</span> Error message goes here
      </p>
    {% endif %}
  </div>
`;

// Variants mapping
const variantClassMap = {
  default: 'border-gray-300 text-gray-900 bg-white',
  hover: 'border-gray-400 text-gray-900 bg-white',
  focus: 'border-blue-500 ring-2 ring-blue-200 text-gray-900 bg-white',
  active: 'border-blue-600 ring-2 ring-blue-300 text-gray-900 bg-white',
  filled: 'border-gray-300 text-gray-900 bg-white',
  critical: 'border-red-500 text-red-900 bg-white',
  disabled: 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'
};

export default {
  title: 'Atoms/Input Multi-Select',
  tags: ['autodocs'],
  
  render: (args) => {
    return nunjucks.renderString(inputMultiSelectTemplate, {
      name: args.name,
      variant: args.variant,
      options: args.options,
      variantClasses: variantClassMap[args.variant] || variantClassMap.default
    });
  },
  
  argTypes: {
    name: { 
      description: 'Unique identifier for the input',
      control: 'text',
      defaultValue: 'multi-select' 
    },
    variant: { 
      description: 'Visual state of the input',
      control: { 
        type: 'select', 
        options: Object.keys(variantClassMap)
      },
      defaultValue: 'default'
    },
    options: {
      description: 'List of selected options',
      control: 'object',
      defaultValue: []
    }
  }
};

// Récupérer les données des chips multi-select
const chipData = chipMultiSelectsData.chip_multi_select_data || {};

// Créer des stories pour chaque variante avec des options
export const Default = { 
  args: { 
    variant: 'default',
    options: []
  } 
};

export const Hover = { 
  args: { 
    variant: 'hover', 
    options: [] 
  } 
};

export const Focus = { 
  args: { 
    variant: 'focus',
    options: [] 
  } 
};

export const Active = { 
  args: { 
    variant: 'active',
    options: chipData.geek_languages ? 
      chipData.geek_languages.options.filter(opt => opt.selected) : 
      [{ value: 'js', label: 'JavaScript', selected: true }]
  } 
};

export const Filled = { 
  args: { 
    variant: 'filled',
    options: chipData.geek_languages ? 
      chipData.geek_languages.options.filter(opt => opt.selected) : 
      [{ value: 'js', label: 'JavaScript', selected: true }]
  } 
};

export const Critical = { 
  args: { 
    variant: 'critical',
    options: [] 
  } 
};

export const Disabled = { 
  args: { 
    variant: 'disabled',
    options: [] 
  } 
};

// Usage guide reste le même
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
      Input Multi-Select Component
    </h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">
          Component States
        </h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Default:</strong> Standard input appearance</li>
          <li><strong>Hover:</strong> When mouse hovers over input</li>
          <li><strong>Focus:</strong> When input is selected/active</li>
          <li><strong>Active:</strong> When interacting with input</li>
          <li><strong>Filled:</strong> When input contains a value</li>
          <li><strong>Critical:</strong> Error state with validation message</li>
          <li><strong>Disabled:</strong> Input cannot be interacted with</li>
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