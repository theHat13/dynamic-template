// src/js/main.js

// Import the multi-select initialization function
import { initializeMultiSelect } from './atoms/multiSelect.js';

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
  console.log('Application initialized');

  // Initialize the multi-select component
  initializeMultiSelect();
});
