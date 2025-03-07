// src/js/atoms/chip-multi-select.js

/**
 * ChipMultiSelect component - Manages interactive chip states and remove functionality
 * @author Your Name
 * @version 1.0.0
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set up all chip-multi-select components
    document.querySelectorAll('.chip-multi-select').forEach(container => {
      const chips = container.querySelectorAll('[role="button"]');
      
      // For each chip
      chips.forEach(chip => {
        // Apply initial disabled state if needed
        if (chip.getAttribute('aria-disabled') === 'true') {
          chip.classList.add(chip.dataset.disabledClass);
          chip.setAttribute('data-state', 'disabled');
        }
        
        // Add mouse event listeners for hover state
        chip.addEventListener('mouseenter', function() {
          if (chip.getAttribute('data-state') !== 'disabled') {
            chip.classList.add(chip.dataset.hoverClass);
            chip.setAttribute('data-state', 'hover');
          }
        });
        
        chip.addEventListener('mouseleave', function() {
          if (chip.getAttribute('data-state') !== 'disabled') {
            chip.classList.remove(chip.dataset.hoverClass);
            chip.setAttribute('data-state', 'default');
          }
        });
        
        // Add focus event listeners
        chip.addEventListener('focus', function() {
          if (chip.getAttribute('data-state') !== 'disabled') {
            chip.classList.add(chip.dataset.focusClass);
            chip.setAttribute('data-state', 'focus');
          }
        });
        
        chip.addEventListener('blur', function() {
          chip.classList.remove(chip.dataset.focusClass);
          if (chip.getAttribute('data-state') !== 'disabled') {
            chip.setAttribute('data-state', 'default');
          }
        });
        
        // Handle remove button click
        const removeBtn = chip.querySelector('.chip-remove');
        if (removeBtn) {
          removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (chip.getAttribute('data-state') !== 'disabled') {
              chip.remove();
            }
          });
        }
        
        // Handle chip keyboard navigation
        chip.addEventListener('keydown', function(e) {
          if (chip.getAttribute('data-state') !== 'disabled') {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const removeBtn = chip.querySelector('.chip-remove');
              if (removeBtn) {
                removeBtn.click();
              }
            }
          }
        });
      });
    });
  });