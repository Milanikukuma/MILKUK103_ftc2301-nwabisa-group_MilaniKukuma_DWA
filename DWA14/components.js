/* eslint-disable */

import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/* HEADER CUSTOM ELEMENT */
class Header extends LitElement {
    constructor() {
        super();
    }

    /*display*/
    render() {
        return html`
        <style>
        header {
            font-size: 3rem;
            font-weight: 900;
            text-align: center;
        }
        </style>
        <header>
        <h1>Tally Counter</h1>
        </header>
        `;
    }
}

customElements.define('tally-header', Header);


 /* BUTTONS CUSTOM ELEMENT */
 class PlusButton extends LitElement {
    //add a properties object and add the disabled as
    //a property of this element.
    static properties = {
        disabled: { type: Boolean}
    };

    constructor() {
        super();
        this.disabled = false;
    }

    render() {
        return html`
        <style>
        button {
            text-align: center;
            border-radius: 5rem;
            width: 5rem;
            height: 3rem;
            background-color:grey;
        }
        </style>
        <button ?disabled=${this.disabled}>+</button>
        `;
    }
 }

 customElements.define('plus-button', PlusButton);

  /* BUTTONS CUSTOM ELEMENT */
  class MinusButton extends LitElement {
    //add a properties object and add the disabled as
    //a property of this element.
    static properties = {
        disabled: { type: Boolean}
    };

    constructor() {
        super();
        this.disabled = false;
    }

    render() {
        return html`
        <style>
        button {
            text-align: center;
            border-radius: 5rem;
            width: 5rem;
            height: 3rem;
            background:grey;
        }
        </style>
        <button ?disabled=${this.disabled}>-</button>
        `;
    }
 }

 customElements.define('minus-button', MinusButton);

  /* BUTTONS CUSTOM ELEMENT */
  class ResetButton extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
        <style>
        button {
            text-align: center;
            border-radius: 5rem;
            width: 5rem;
            height: 3rem;
            background:grey;
           
        }
        </style>
        <button>Reset</button>
        `;
    }
 }

 customElements.define('reset-button', ResetButton);

 /* Footer CUSTOM ELEMENT */
 class Footer extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
        <footer>Inspired by <a href="https://tallycount.app/">Tally Count</a> webApp.</footer>
        `;
    }
 }

 customElements.define('footer-element', Footer);