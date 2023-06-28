/* eslint-disable */

// GLOBAL CONSTANTS
const MAX_NUMBER = 100;
const MIN_NUMBER = 1;

// store three things in our js storage
// to select the three html elements we want to use and store

// use const because variable will always refer to element
//Do not use css classes
//because if it is changed then the response will stop
//use element id's and (data-key)data attributes=allow you to add custom attributes
//to HTML
const progressRing = document.querySelector('sl-progress-ring[data-key="number"]');
const numberValue = document.querySelector('[data-key="number-value"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');

const subtractHandler = () => {
  myStore.publish({ type: 'MINUS' });
  console.log(myStore.getState());

  const newValue = parseInt(numberValue.textContent) - 1;
  numberValue.textContent = newValue;
  progressRing.value = (newValue / MAX_NUMBER) * 100;

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
    add.disabled = false;
  }
};

const addHandler = () => {
  myStore.publish({ type: 'ADD' });
  console.log(myStore.getState());

  const newValue = parseInt(numberValue.textContent) + 1;
  numberValue.textContent = newValue;
  progressRing.value = (newValue / MAX_NUMBER) * 100;

  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
    subtract.disabled = false;
  }
};

const resetHandler = () => {
  myStore.publish({ type: 'RESET' });
  console.log(myStore.getState());

  const resetMsg = document.getElementById('reset-message');
  resetMsg.hidden = false;

  setTimeout(() => {
    resetMsg.hidden = true;
  }, 1250);

  add.disabled = false;
  subtract.disabled = false;
  numberValue.textContent = '0';
  progressRing.value = 0;
};

subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);



const store = (reducer) => {
        let state;
        let handlers = [];
        const fetchState = () => state;
        
        const publish = (action) => {
                state = reducer(state, action);
                handlers.unshift(state);
                console.log(handlers);
        };

        
        const getState = () => fetchState();

        return {
                getState,
                publish
        };
};


const reducer = (state = 0, action) => {
        switch (action.type) {
                case 'ADD':
                        return state + 1;
                case 'MINUS':
                        return state - 1;
                case 'RESET':
                        return state = 0;
                default:
                        return state;
        }
};

const myStore = store(reducer);