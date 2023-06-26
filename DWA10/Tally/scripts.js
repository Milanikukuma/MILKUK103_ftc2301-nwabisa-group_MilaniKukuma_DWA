/**
 * The step amount by which the counter value is incremented or decremented.
 * @type {number}
 */
const STEP_AMOUNT = 1;

/**
 * The input element that displays the counter value.
 * @type {HTMLInputElement}
 */
const number = document.querySelector('[data-key="number"]');

/**
 * The subtract button element.
 * @type {HTMLButtonElement}
 */
const subtract = document.querySelector('[data-key="subtract"]');

/**
 * The add button element.
 * @type {HTMLButtonElement}
 */
const add = document.querySelector('[data-key="add"]');

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

/**
 * Abstract superclass representing a counter.
 */
class Counter {
  constructor() {
    this.value = 0;
  }

  /**
   * Increases the value of the counter by the step amount.
   * This method will be overridden in the subclasses.
   */
  increment() {}

  /**
   * Decreases the value of the counter by the step amount.
   * This method will be overridden in the subclasses.
   */
  decrement() {}
}

/**
 * Subclass of Counter representing a positive counter.
 */
class PositiveCounter extends Counter {
  increment() {
    this.value += STEP_AMOUNT;
  }

  decrement() {
    if (this.value >= STEP_AMOUNT) {
      this.value -= STEP_AMOUNT;
    }
  }
}

/**
 * Subclass of Counter representing a negative counter.
 */
class NegativeCounter extends Counter {
  increment() {
    if (this.value >= -STEP_AMOUNT) {
      this.value -= STEP_AMOUNT;
    }
  }

  decrement() {
    this.value += STEP_AMOUNT;
  }
}

// Create an instance of the PositiveCounter class
const counter = new PositiveCounter();

/**
 * Updates the counter value displayed in the input element.
 */
const updateCounterDisplay = () => {
  number.value = counter.value;
};

/**
 * Increases the value of the counter by the step amount.
 */
const increment = () => {
  counter.increment();
  updateCounterDisplay();
};

/**
 * Decreases the value of the counter by the step amount.
 */
const decrement = () => {
  counter.decrement();
  updateCounterDisplay();
};

/**
 * Resets the value of the counter to 0 and shows a reset message.
 */
const resetCounter = () => {
  counter.value = 0;
  resetmsg.show();
  updateCounterDisplay();
};

subtract.addEventListener('click', decrement);
add.addEventListener('click', increment);
reset.addEventListener('click', resetCounter);