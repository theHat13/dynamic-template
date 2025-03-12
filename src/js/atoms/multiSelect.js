/**
 * MultiSelect Component - Handles selection, chip rendering, and hidden input updates.
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function () {
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

    /**
     * Handles chip interactions (hover, focus, remove).
     */
    function setupChipEvents(chip) {
      chip.addEventListener('mouseenter', () => chip.classList.add('hover'));
      chip.addEventListener('mouseleave', () => chip.classList.remove('hover'));
      chip.addEventListener('focus', () => chip.classList.add('focus'));
      chip.addEventListener('blur', () => chip.classList.remove('focus'));

      // Handle remove button
      const removeBtn = chip.querySelector('.chip-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          chip.remove();
          updateHiddenInput();
        });
      }

      // Keyboard navigation
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          removeBtn?.click();
        }
      });
    }

    // Attach events to existing chips
    chipContainer.querySelectorAll('[data-option-value]').forEach(setupChipEvents);

    // Handle input click (extendable for dropdown integration)
    input.addEventListener('click', () => {
      console.log('Dropdown functionality can be implemented here');
    });
  });
});
