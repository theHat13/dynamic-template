// src/stories/atoms/Chip.stories.js
import nunjucks from 'nunjucks';
import chipData from '../../_data/styles/atoms/chip.json';
import chipsData from '../../_data/contents/atoms/chips.json';

// Nunjucks template for rendering chips
const chipTemplate = `
  <span 
    class="inline-flex items-center justify-center rounded-full text-white {{ variantClass }} {{ sizeClass }}"
    role="status"
  >
    {{ content }}
  </span>
`;

// Helper function to determine size class based on content length
function getSizeClass(content) {
  const contentLength = String(content).length;
  if (contentLength <= 1) return 'h-6 w-6 text-xs';
  if (contentLength <= 2) return 'h-8 w-8 text-sm';
  return 'h-10 w-10 px-1 text-sm';
}

export default {
  title: 'Atoms/Chip',
  tags: ['autodocs'],
  
  // Render function using Nunjucks macro-like approach
  render: (args) => {
    return nunjucks.renderString(chipTemplate, {
      content: args.content,
      variantClass: chipData.variants[args.variant] || chipData.variants.default,
      sizeClass: getSizeClass(args.content)
    });
  },
  
  // Argument types for Storybook controls
  argTypes: {
    content: { 
      description: 'Numeric value or text to display in the chip',
      control: 'text',
      defaultValue: '0' 
    },
    variant: { 
      description: 'Visual style of the chip',
      control: { 
        type: 'select', 
        options: Object.keys(chipData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from chips.json
const chipExamples = chipsData.chip_data;

export const NotificationCount = {
  args: {
    content: chipExamples.notification_count,
    variant: 'default'
  }
};

export const UnreadMessages = {
  args: {
    content: chipExamples.unread_messages,
    variant: 'info'
  }
};

export const CompletedTasks = {
  args: {
    content: chipExamples.completed_tasks,
    variant: 'success'
  }
};

export const OverflowedCount = {
  args: {
    content: chipExamples.overflowed,
    variant: 'warning'
  }
};

// Usage guide for the Chip component
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/chip.njk" import renderChip %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChip(chips.chip_data.notification_count) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom variant directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChip({
  content: '42', 
  variant: 'success'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/chips.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/chip.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to chips.json:</h4>
          <pre><code class="text-sm text-gray-900">"chip_data": {
  "your_new_chip": {
    "name": "unique_name",
    "content": "42"
  }
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to chip.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": {
  "your_new_variant": "bg-purple-500"
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