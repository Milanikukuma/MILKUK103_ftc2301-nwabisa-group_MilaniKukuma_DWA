// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
// Initialize page and matches variables
let page = 1;
let matches = books;

// Create a document fragment to hold the starting elements
const starting = document.createDocumentFragment();

// Iterate over the matches array and create preview elements
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  // Create a button element for each book
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  // Set the inner HTML of the button element
  element.innerHTML = `
    <img
        class="preview__image"
        src="${image}"
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  // Append the button element to the document fragment
  starting.appendChild(element);
}

// Append the starting element to the list items container
document.querySelector('[data-list-items]').appendChild(starting);

// Create a document fragment for the genre options
const genreHtml = document.createDocumentFragment();

// Create the first option element for 'All Genres'
const firstGenreElement = document.createElement('option');
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

// Iterate over the genres object and create option elements
for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

// Append the genre options to the search genres container
document.querySelector('[data-search-genres]').appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)

// Check if the user's preferred color scheme is dark
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Set the theme value to 'night' in the settings dropdown
  document.querySelector('[data-settings-theme]').value = 'night';

  // Set the CSS variables for dark mode
  setDarkMode();
} else {
  // Set the theme value to 'day' in the settings dropdown
  document.querySelector('[data-settings-theme]').value = 'day';

  // Set the CSS variables for light mode
  setLightMode();
}

// Function to set the CSS variables for dark mode
function setDarkMode() {
  document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
  document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}

// Function to set the CSS variables for light mode
function setLightMode() {
  document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
  document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}


document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true 
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true 
})

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})

/*uses abstractions like arrays, iteration, 
 and array manipulation to filter a 
 collection of books based on certain criteria.*/

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
// Create an empty array to hold the filtered result
result = [];

// Iterate over each book in the books array
for (const book of books) {
  // Initialize genreMatch flag to false
  let genreMatch = filters.genre === 'any';

  // Iterate over each genre of the current book
  for (const singleGenre of book.genres) {
    // If genreMatch is already true, break out of the loop
    if (genreMatch) break;

    // Check if the singleGenre matches the selected genre filter
    if (singleGenre === filters.genre) {
      genreMatch = true; // Set genreMatch to true
    }
  }

  // Check if the book matches the applied filters
  if (
    (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
    (filters.author === 'any' || book.author === filters.author) &&
    genreMatch
  ) {
    // If the book matches the filters, add it to the result array
    result.push(book);
  }
}
 /*encapsulating logic(by grouping related functionality together and hiding implementation details.) 
 within functions*/

// Set the initial page and matches
 page = 1;
matches = result;

if (result.length < 1) {
  document.querySelector('[data-list-message]').classList.add('list__message_show');
} else {
  document.querySelector('[data-list-message]').classList.remove('list__message_show');
}

// Clear the existing items in the list container
document.querySelector('[data-list-items]').innerHTML = '';

// Create a document fragment to hold the new elements
newItems = document.createDocumentFragment();

// Loop over the matches to create new elements for the current page
for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
  // Create a button element for each book
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  // Set the inner HTML of the button element
  element.innerHTML = `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  // Append the button element to the document fragment
  newItems.appendChild(element);
}

// Append the new items to the list items container
document.querySelector('[data-list-items]').appendChild(newItems);


    // Append the new items to the list items container
function appendItemsToContainer(items) {
  document.querySelector('[data-list-items]').appendChild(items);
}

// Disable or enable the list button based on the number of remaining matches
function updateListButtonState() {
  const remainingMatches = matches.length - (page * BOOKS_PER_PAGE);
  const listButton = document.querySelector('[data-list-button]');
  listButton.disabled = remainingMatches < 1;
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingMatches > 0 ? remainingMatches : 0})</span>
  `;
}


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function closeSearchOverlay() {
  document.querySelector('[data-search-overlay]').open = false;
}
function clearListContainer() {
  document.querySelector('[data-list-items]').innerHTML = '';
}

function generateItemHTML({ author, id, image, title }) {
  return `
    <button class="preview" data-preview="${id}">
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    </button>
  `;
}

// Update the list with new items and perform necessary actions
function updateList() {
  clearListContainer();

  const newItems = document.createDocumentFragment();
  const itemsToDisplay = result.slice(0, BOOKS_PER_PAGE);

  for (const item of itemsToDisplay) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', item.id);
    element.innerHTML = generateItemHTML(item);
    newItems.appendChild(element);
  }

  appendItemsToContainer(newItems);
  updateListButtonState();
  scrollToTop();
  closeSearchOverlay();
}

// Event listener for the list button click event
document.querySelector('[data-list-button]').addEventListener('click', updateList);

})

// Add event listener to the list button
document.querySelector('[data-list-button]').addEventListener('click', () => {
  // Create a document fragment to hold the new elements
  const fragment = document.createDocumentFragment();

  // Loop over the matches array to create new elements
  for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
      // Create a button element for each book
      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('data-preview', id);
  
      // Set the inner HTML of the button element
      element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
      `;

      // Append the button element to the document fragment
      fragment.appendChild(element);
  }

  // Append the document fragment to the list items container
  document.querySelector('[data-list-items]').appendChild(fragment);

  // Increment the page counter
  page += 1;
});


// Function to set the active book details in the DOM
function setActiveBook(book) {
  // Open the active book section
  document.querySelector('[data-list-active]').open = true;
  
  // Update the book image sources
  document.querySelector('[data-list-blur]').src = book.image;
  document.querySelector('[data-list-image]').src = book.image;
  
  // Update the book title
  document.querySelector('[data-list-title]').innerText = book.title;
  
  // Update the book author and publication year
  document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
  
  // Update the book description
  document.querySelector('[data-list-description]').innerText = book.description;
}

// Add event listener to the list items container
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  // Iterate over the event path to find the clicked element with data-preview attribute
  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      // Find the corresponding book in the books array
      active = books.find((book) => book.id === node.dataset.preview);
    }
  }

  // If an active book is found, update the DOM with its details
  if (active) {
    setActiveBook(active);
  }
});
