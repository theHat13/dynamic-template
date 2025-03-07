// src/stories/atoms/Tooltip.stories.js
import nunjucks from 'nunjucks';
import tooltipData from '../../_data/styles/atoms/tooltip.json';
import tooltipsData from '../../_data/contents/atoms/tooltips.json';

// Nunjucks template for rendering tooltips
const tooltipTemplate = `
  <div class="tooltip-container">
    <button 
      class="tooltip typography-label-l" 
      aria-describedby="tooltip-{{ name }}"
    >
      {{ buttonText }}
    </button>
    <div 
      id="tooltip-{{ name }}" 
      class="tag inline-flex items-center px-2 py-1 text-xs font-medium rounded-md tooltip--{{ variant }} {{ variantClass }}"
    >
      {{ text }}
    </div>
  </div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = tooltipData.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class.replace(`tooltip--${variant}`, '').trim() : '';
}

export default {
  title: 'Atoms/Tooltip',
  tags: ['autodocs'],
  
  // Render function using Nunjucks
  render: (args) => {
    return nunjucks.renderString(tooltipTemplate, {
      name: args.name || 'default',
      buttonText: args.buttonText || 'Hover me',
      text: args.text,
      variant: args.variant,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for Storybook controls
  argTypes: {
    name: {
      description: 'Unique identifier for the tooltip',
      control: 'text',
      defaultValue: 'default'
    },
    buttonText: { 
      description: 'Text for the triggering button',
      control: 'text',
      defaultValue: 'Hover me' 
    },
    text: { 
      description: 'Tooltip content text',
      control: 'text',
      defaultValue: 'Tooltip content' 
    },
    variant: { 
      description: 'Visual style of the tooltip',
      control: { 
        type: 'select', 
        options: tooltipData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from tooltips.json
const tooltipExamples = tooltipsData.tooltip_data;

export const MysticAmulet = {
  args: {
    name: tooltipExamples.mystic_amulet.name,
    buttonText: 'Mystic Amulet',
    text: tooltipExamples.mystic_amulet.text,
    variant: tooltipExamples.mystic_amulet.variant
  }
};

export const CriticalWarning = {
  args: {
    name: tooltipExamples.critical_warning.name,
    buttonText: 'Warning',
    text: tooltipExamples.critical_warning.text,
    variant: tooltipExamples.critical_warning.variant
  }
};

export const InfoTip = {
  args: {
    name: tooltipExamples.info_tip.name,
    buttonText: 'More Info',
    text: tooltipExamples.info_tip.text,
    variant: tooltipExamples.info_tip.variant
  }
};

// Usage guide story
export const Usage = () => {
    const usageGuide = document.createElement('div');
    usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
    usageGuide.innerHTML = `
      <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
          <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms-notifications/tooltip.njk" import renderTooltip %}</code></pre>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
          <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTooltip(tooltips.tooltip_data.mystic_amulet) }}</code></pre>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom variant directly in the call:</h3>
          <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTooltip({
    text: 'Custom tooltip text', 
    buttonText: 'Custom button', 
    variant: 'warning'
  }) }}</code></pre>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
          <p class="text-gray-600 mb-3">Check the following files:</p>
          <ul class="list-disc pl-6 space-y-2 text-gray-600">
            <li>Content: <code>src/_data/contents/atoms/tooltips.json</code></li>
            <li>Styles: <code>src/_data/styles/atoms/tooltip.json</code></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
          <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
            <h4 class="font-semibold mb-2">Add content to tooltips.json:</h4>
            <pre><code class="text-sm text-gray-900">"tooltip_data": {
    "your_new_tooltip": {
      "name": "unique_name",
      "text": "Your tooltip text",
      "variant": "default"
    }
  }</code></pre>
            
            <h4 class="font-semibold mt-4 mb-2">Add style to tooltip.json:</h4>
            <pre><code class="text-sm text-gray-900">"variants": [
    {
      "name": "your_new_variant",
      "class": "custom-tooltip-style"
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