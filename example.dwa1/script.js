
const progressRing = document.querySelector('.progress-ring-values');
const subtractButton = progressRing.nextElementSibling.nextElementSibling;
const addButton = subtractButton.nextElementSibling;
const resetCounter = resettButton.progressRing;

addButton.addEventListener('click', () => {
  const value = Math.min(100, progressRing.value + 1);
  progressRing.value = value;
  progressRing.textContent = `${value}`;
});

subtractButton.addEventListener('click', () => {
  const value = Math.max(0, progressRing.value - 1);
  progressRing.value = value;
  progressRing.textContent = `${value}`;
});

resetButton.addEventListener('click', () => {
  counter.value = 0;
  resetmsg.show();
  progressRing.textContent = `${value}`;
  });

  
 
/**
 * The reset button element.
 * @type {HTMLButtonElement}
 */
const reset = document.querySelector('[data-key="reset"]');

/**
 * The reset alert message element.
 * @type {HTMLElement}
 */
const resetmsg = document.querySelector('[data-key="alert-reset"]');