// src/stories/atoms/InputDatepicker.stories.js
import nunjucks from 'nunjucks';
import inputDatepickerData from '../../_data/styles/atoms/input_datepicker.json';
import inputDatepickersData from '../../_data/contents/atoms/input_datepickers.json';

// Variant classes mapping
const variantClasses = {
  default: 'border-gray-300 text-gray-900',
  hover: 'border-gray-400 text-gray-900 hover:border-gray-500',
  focus: 'border-blue-500 ring-2 ring-blue-200 text-gray-900',
  active: 'border-blue-600 ring-2 ring-blue-300 text-gray-900',
  filled: 'border-gray-400 text-gray-900',
  critical: 'border-red-500 ring-2 ring-red-200 text-red-900 placeholder-red-400',
  disabled: 'border-gray-200 text-gray-400 cursor-not-allowed'
};

export default {
  title: 'Atoms/InputDatepicker',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const variant = args.variant || 'default';
    
    return `
      <div>
        <label for="datepicker" class="block mb-2 ${variant === 'disabled' ? 'text-gray-400' : 'text-gray-700'}">
          ${args.label || 'Label'} ${variant === 'critical' ? '*' : ''}
        </label>
        <input 
          type="date" 
          id="datepicker" 
          name="datepicker"
          class="w-full px-3 py-2 border rounded-md ${variantClasses[variant] || variantClasses.default}"
          min="${args.min || ''}"
          max="${args.max || ''}"
          placeholder="${args.placeholder || 'dd/mm/yyyy'}"
          ${variant === 'disabled' ? 'disabled' : ''}
        >
        ${variant === 'critical' && args.errorMessage 
          ? `<p class="mt-1 text-sm text-red-600">${args.errorMessage}</p>` 
          : ''}
      </div>
    `;
  },
  
  // Argument types for Storybook controls
  argTypes: {
    id: { 
      description: 'Unique identifier for the datepicker input',
      control: 'text',
      defaultValue: 'datepicker-id' 
    },
    name: { 
      description: 'Name attribute for form submission',
      control: 'text',
      defaultValue: 'datepicker-name' 
    },
    label: { 
      description: 'Text label for the input field',
      control: 'text',
      defaultValue: 'Select a Date' 
    },
    variant: { 
      description: 'Visual style of the input',
      control: { 
        type: 'select', 
        options: Object.keys(variantClasses)
      },
      defaultValue: 'default'
    },
    min: { 
      description: 'Minimum selectable date',
      control: 'date',
      defaultValue: null
    },
    max: { 
      description: 'Maximum selectable date',
      control: 'date',
      defaultValue: null
    },
    placeholder: { 
      description: 'Placeholder text',
      control: 'text',
      defaultValue: 'dd/mm/yyyy' 
    },
    errorMessage: { 
      description: 'Error message for critical variant',
      control: 'text',
      defaultValue: '' 
    }
  }
};

// Create examples using data from input_datepickers.json
const datePickerExamples = inputDatepickersData.datepicker_data;

export const QuestRegistration = {
  args: {
    id: datePickerExamples.quest_registration.id,
    name: datePickerExamples.quest_registration.name,
    label: datePickerExamples.quest_registration.label,
    min: datePickerExamples.quest_registration.min,
    max: datePickerExamples.quest_registration.max,
    placeholder: datePickerExamples.quest_registration.placeholder,
    variant: datePickerExamples.quest_registration.variant
  }
};

export const ProphecyFulfillment = {
  args: {
    id: datePickerExamples.prophecy_fulfillment.id,
    name: datePickerExamples.prophecy_fulfillment.name,
    label: datePickerExamples.prophecy_fulfillment.label,
    min: datePickerExamples.prophecy_fulfillment.min,
    max: datePickerExamples.prophecy_fulfillment.max,
    placeholder: datePickerExamples.prophecy_fulfillment.placeholder,
    variant: datePickerExamples.prophecy_fulfillment.variant
  }
};

export const CharacterCreation = {
  args: {
    id: datePickerExamples.character_creation.id,
    name: datePickerExamples.character_creation.name,
    label: datePickerExamples.character_creation.label,
    min: datePickerExamples.character_creation.min,
    max: datePickerExamples.character_creation.max,
    placeholder: datePickerExamples.character_creation.placeholder,
    variant: datePickerExamples.character_creation.variant,
    errorMessage: datePickerExamples.character_creation.errorMessage
  }
};

export const ArtifactDiscovery = {
  args: {
    id: datePickerExamples.artifact_discovery.id,
    name: datePickerExamples.artifact_discovery.name,
    label: datePickerExamples.artifact_discovery.label,
    min: datePickerExamples.artifact_discovery.min,
    max: datePickerExamples.artifact_discovery.max,
    placeholder: datePickerExamples.artifact_discovery.placeholder,
    variant: datePickerExamples.artifact_discovery.variant
  }
};

export const LegendaryTournament = {
  args: {
    id: datePickerExamples.legendary_tournament.id,
    name: datePickerExamples.legendary_tournament.name,
    label: datePickerExamples.legendary_tournament.label,
    min: datePickerExamples.legendary_tournament.min,
    max: datePickerExamples.legendary_tournament.max,
    placeholder: datePickerExamples.legendary_tournament.placeholder,
    variant: datePickerExamples.legendary_tournament.variant,
    errorMessage: datePickerExamples.legendary_tournament.errorMessage
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
          <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/input-datepicker.njk" import renderInputDatepicker %}</code></pre>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
          <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputDatepicker(input_datepickers.datepicker_data.quest_registration) }}</code></pre>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom variant directly in the call:</h3>
          <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInputDatepicker({
    id: "custom-date",
    name: "custom_date", 
    variant: "focus",
    placeholder: "Select your date"
  }) }}</code></pre>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
          <p class="text-gray-600 mb-3">Check the following files:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-600">
            <li>Content: <code>src/_data/contents/atoms/input_datepickers.json</code></li>
            <li>Styles: <code>src/_data/styles/atoms/input_datepicker.json</code></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
          <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
            <h4 class="font-semibold mb-2">Add content to input_datepickers.json:</h4>
            <pre><code class="text-sm text-gray-900">"datepicker_data": {
    "your_new_datepicker": {
      "id": "unique_id",
      "name": "unique_name",
      "placeholder": "Your placeholder",
      "variant": "default"
    }
  }</code></pre>
            
            <h4 class="font-semibold mt-4 mb-2">Add style to input_datepicker.json:</h4>
            <pre><code class="text-sm text-gray-900">"variants": [
    {
      "name": "your_new_variant",
      "class": "input--custom text-purple-600 border-purple-500"
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