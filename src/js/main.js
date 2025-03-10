// src/js/main.js

// Import atom level components
import { initializeChipMultiSelect } from './atoms/chip-multi-select.js';
import { initializeInputMultiSelect } from './atoms/input-multi-select.js';

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
  console.log('Application initialized');
  
  // Initialize components
  initializeChipMultiSelect();
});