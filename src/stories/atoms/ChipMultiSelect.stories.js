// src/stories/atoms/ChipMultiSelect.stories.js
import nunjucks from 'nunjucks';
import chipMultiSelectData from '../../_data/styles/atoms/chip_multi_select.json';

// Nunjucks template for rendering chip multi-selects
const chipMultiSelectTemplate = `
  <div class="chip-multi-select">
    <span class="inline-flex items-center font-medium text-purple-500 text-xs mb-2">
      <span class="w-3 h-3 inline-block mr-1 bg-purple-500 rounded-full"></span>
      .chip-multiselect
    </span>
    
    <div class="{{ variantStyles.container }}">
      <!-- Default state -->
      <div class="{{ variantStyles.chip.base }} {{ variantStyles.chip.default }}" role="button" tabindex="0">
        <span>Label</span>
        <button type="button" class="chip-remove {{ variantStyles.chip.removeIcon }}" aria-label="Remove">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      
      <!-- Hover state -->
      <div class="{{ variantStyles.chip.base }} {{ variantStyles.chip.default }} {{ variantStyles.chip.hover }}" role="button" tabindex="0">
        <span>Label</span>
        <button type="button" class="chip-remove {{ variantStyles.chip.removeIcon }}" aria-label="Remove">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      
      <!-- Focus state -->
      <div class="{{ variantStyles.chip.base }} {{ variantStyles.chip.default }} {{ variantStyles.chip.focus }}" role="button" tabindex="0">
        <span>Label</span>
        <button type="button" class="chip-remove {{ variantStyles.chip.removeIcon }}" aria-label="Remove">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      
      <!-- Disabled state -->
      <div class="{{ variantStyles.chip.base }} {{ variantStyles.chip.disabled }}" role="button" aria-disabled="true" tabindex="-1">
        <span>Label</span>
        <button type="button" class="chip-remove {{ variantStyles.chip.removeIcon }}" aria-label="Remove" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
`;

// Helper function to get variant styles
function getVariantStyles(variant) {
  return chipMultiSelectData.variants[variant] || chipMultiSelectData.variants.default;
}

export default {
  title: 'Atoms/ChipMultiSelect',
  tags: ['autodocs'],
  
  render: (args) => {
    return nunjucks.renderString(chipMultiSelectTemplate, {
      variantStyles: getVariantStyles(args.variant)
    });
  },
  
  argTypes: {
    variant: { 
      description: 'Visual style of the chip group',
      control: { 
        type: 'select', 
        options: Object.keys(chipMultiSelectData.variants)
      },
      defaultValue: 'default'
    }
  }
};

export const States = {};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Chip Multi-Select Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">States</h3>
        <p class="text-gray-600 mb-3">The component supports four visual states:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Default:</strong> Normal appearance</li>
          <li><strong>Hover:</strong> Visual feedback when mouse is over the chip</li>
          <li><strong>Focus:</strong> Visual feedback when navigating with keyboard (blue border)</li>
          <li><strong>Disabled:</strong> Cannot be interacted with (grayed out)</li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">Implementation</h3>
        <p class="text-gray-600 mb-3">This chip component allows for selecting multiple options with remove functionality. Each chip has:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>A text label</li>
          <li>A remove button (×)</li>
          <li>Interactive states via CSS classes</li>
          <li>Proper accessibility attributes</li>
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