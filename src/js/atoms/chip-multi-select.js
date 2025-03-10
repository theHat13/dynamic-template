/**
 * ChipMultiSelect component - Handles chip selection, removal, and hidden input updates.
 * @version 2.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-multi-select-container]').forEach(container => {
    const input = container.querySelector('[data-multi-select-input]');
    const hiddenInput = container.querySelector('[data-multi-select-values]');
    const chipContainer = container.querySelector('[data-chip-container]');

    if (!input || !hiddenInput || !chipContainer) return;

    /**
     * Updates the hidden input with the current selected values.
     */
    function updateHiddenInput() {
      const values = Array.from(chipContainer.querySelectorAll('[data-option-value]'))
        .map(chip => chip.dataset.optionValue);
      hiddenInput.value = JSON.stringify(values);
    }

    // Initial update
    updateHiddenInput();

    /**
     * Handles chip interactions (hover, focus, remove).
     */
    function setupChipEvents(chip) {
      if (chip.getAttribute('aria-disabled') === 'true') {
        chip.classList.add(chip.dataset.disabledClass);
        chip.setAttribute('data-state', 'disabled');
        return;
      }

      chip.addEventListener('mouseenter', () => {
        if (chip.dataset.state !== 'disabled') {
          chip.classList.add(chip.dataset.hoverClass);
          chip.dataset.state = 'hover';
        }
      });

      chip.addEventListener('mouseleave', () => {
        if (chip.dataset.state !== 'disabled') {
          chip.classList.remove(chip.dataset.hoverClass);
          chip.dataset.state = 'default';
        }
      });

      chip.addEventListener('focus', () => {
        if (chip.dataset.state !== 'disabled') {
          chip.classList.add(chip.dataset.focusClass);
          chip.dataset.state = 'focus';
        }
      });

      chip.addEventListener('blur', () => {
        chip.classList.remove(chip.dataset.focusClass);
        if (chip.dataset.state !== 'disabled') {
          chip.dataset.state = 'default';
        }
      });

      // Handle remove button
      const removeBtn = chip.querySelector('.chip-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (chip.dataset.state !== 'disabled') {
            chip.remove();
            updateHiddenInput();
          }
        });
      }

      // Keyboard navigation
      chip.addEventListener('keydown', (e) => {
        if (chip.dataset.state !== 'disabled' && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          removeBtn?.click();
        }
      });
    }

    // Attach events to existing chips
    chipContainer.querySelectorAll('[data-option-value]').forEach(setupChipEvents);

    // Mutation observer for dynamic changes
    const observer = new MutationObserver(() => updateHiddenInput());
    observer.observe(chipContainer, { childList: true });

    // Handle input click to open a dropdown (if applicable)
    input.addEventListener('click', () => {
      console.log('Open dropdown for selecting options');
      // This can be extended to integrate with an actual dropdown
    });
  });
});
