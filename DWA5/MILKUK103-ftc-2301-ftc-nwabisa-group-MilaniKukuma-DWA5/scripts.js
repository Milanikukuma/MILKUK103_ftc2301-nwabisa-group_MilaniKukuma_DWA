// scripts.js

// Get form and result elements from the DOM
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// Add event listener to the form submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Extract input values from the form
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  try {
    // Check for invalid input conditions
    if (isNaN(dividend) || isNaN(divider) || divider === "0" || dividend.trim() === "" || divider.trim() === "") {
      result.innerText = "Division not performed. Both values are required in Inputs. Try again.";
      console.error("Invalid division. Dividend:", dividend, "Divider:", divider);
      return;
    }

    // Special case check for specific value
    if (divider === "-3") {
      result.innerText = "Division not performed. Invalid number provided. Try again.";
      console.error("Invalid division. Dividend:", dividend, "Divider:", divider);
      return;
    }

    // Perform the division and display the result
    result.innerText = Math.floor(dividend / divider);
  } catch (error) {
    // Handle critical errors
    console.error("Something critical went wrong:", error);
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page.</h1>";
  }

  try {
    // Convert input to numbers and perform the division
    const dividendNumber = parseFloat(dividend);
    const dividerNumber = parseFloat(divider);

    // Check for invalid input conditions
    if (isNaN(dividendNumber) || isNaN(dividerNumber)) {
      throw new Error("Invalid input. Only numbers are allowed.");
    }

    // Perform the division and display the result
    result.innerText = Math.floor(dividendNumber / dividerNumber);
  } catch (error) {
    // Handle critical errors
    console.error("Something critical went wrong:", error);
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page.</h1>";
  }
});
