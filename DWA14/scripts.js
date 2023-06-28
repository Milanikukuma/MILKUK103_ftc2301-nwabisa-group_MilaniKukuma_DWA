/* eslint-disable */

// Store function for state management
const store = (reducer) => {
    let state;
    const fetchState = () => state;

    const publish = (action) => {
        state = reducer(state, action);
    };

    const getState = () => fetchState();

    return {
        getState,
        publish
    };
};

// Reducer function for state updates
const reducer = (state = 'Normal', action) => {
    switch (action.type) {
        case 'ADD':
            if (state === 'Minimum reached') {
                return 'Normal';
            } else if (state === 'Normal' && parseInt(number.value) + 1 >= MAX_NUMBER) {
                return 'Maximum reached';
            } else {
                return 'Normal';
            }
        case 'MINUS':
            if (state === 'Maximum reached') {
                return 'Normal';
            } else if (state === 'Normal' && parseInt(number.value) - 1 <= MIN_NUMBER) {
                return 'Minimum reached';
            } else {
                return 'Normal';
            }
        case 'RESET':
            return 'Normal';
        default:
            return state;
    }
};

// Create store instance
const myStore = store(reducer);

// Global constants
const MAX_NUMBER = 20;
const MIN_NUMBER = -20;

// DOM elements
const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');

// Event handlers
const subtractHandler = () => {
    myStore.publish({ type: 'MINUS' });
    const newValue = parseInt(number.value) - 1;
    number.value = newValue;
    subtract.disabled = newValue <= MIN_NUMBER;
    add.disabled = false;
};

const addHandler = () => {
    myStore.publish({ type: 'ADD' });
    const newValue = parseInt(number.value) + 1;
    number.value = newValue;
    subtract.disabled = false;
    add.disabled = newValue >= MAX_NUMBER;
};

const resetHandler = () => {
    myStore.publish({ type: 'RESET' });
    const resetMsg = document.getElementById('reset-message');
    resetMsg.hidden = false;
    setTimeout(() => {
        resetMsg.hidden = true;
    }, 1250);
    add.disabled = false;
    subtract.disabled = false;
    number.value = 0;
};

// Event listeners
subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);
