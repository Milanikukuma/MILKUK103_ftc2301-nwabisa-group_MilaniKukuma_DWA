import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    starting.appendChild(element)
}

document.querySelector('[data-list-items]').appendChild(starting)

/**
 * Represents a search form that dynamically generates genre and author options.
 */
class SearchForm {
  /**
   * Creates an instance of SearchForm.
   */
  constructor() {
    /**
     * The genre select element.
     * @type {HTMLElement}
     */
    this.genreElement = document.querySelector('[data-search-genres]');

    /**
     * The author select element.
     * @type {HTMLElement}
     */
    this.authorElement = document.querySelector('[data-search-authors]');

    this.createGenreOptions();
    this.createAuthorOptions();
  }

  /**
   * Creates genre options dynamically and appends them to the genre select element.
   */
  createGenreOptions() {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreHtml.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      genreHtml.appendChild(element);
    }

    this.genreElement.appendChild(genreHtml);
  }

  /**
   * Creates author options dynamically and appends them to the author select element.
   */
  createAuthorOptions() {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorsHtml.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      authorsHtml.appendChild(element);
    }

    this.authorElement.appendChild(authorsHtml);
  }
}

// Create an instance of the SearchForm class
const searchForm = new SearchForm();



function setTheme(theme, colorDark, colorLight) {
  document.querySelector('[data-settings-theme]').value = theme;
  document.documentElement.style.setProperty('--color-dark', colorDark);
  document.documentElement.style.setProperty('--color-light', colorLight);
}

// Call the function to set the theme initially
setThemeBasedOnColorScheme();


document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0

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

function setThemeBasedOnColorScheme(){
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('night', '255, 255, 255', '10, 10, 20');
} else {
  setTheme('day', '10, 10, 20', '255, 255, 255');
}  
}
class SettingsForm {
  /**
   * Represents a settings form handler.
   */
  constructor() {
    /**
     * The form element.
     * @type {HTMLElement}
     */
    this.formElement = document.querySelector('[data-settings-form]');

    /**
     * The overlay element.
     * @type {HTMLElement}
     */
    this.overlayElement = document.querySelector('[data-settings-overlay]');

    this.bindEventListeners();
  }

  /**
   * Binds event listeners to the form element.
   */
  bindEventListeners() {
    this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  /**
   * Handles the form submission event.
   * @param {Event} event - The form submission event object.
   */
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    

    /**
     * The selected theme from the form.
     * @type {string}
     */
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    /**
     * Whether the overlay is open or not.
     * @type {boolean}
     */
    this.overlayElement.open = false;
  }
}

// Create an instance of the SettingsForm class
const settingsForm = new SettingsForm();



document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const filters = Object.fromEntries(formData)
  const result = []

  for (const book of books) {
      let genreMatch = filters.genre === 'any'

      for (const singleGenre of book.genres) {
          if (genreMatch) break;
          if (singleGenre === filters.genre) { genreMatch = true }
      }

      if (
          (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
          (filters.author === 'any' || book.author === filters.author) && 
          genreMatch
      ) {
          result.push(book)
      }
  }

  page = 1;
  matches = result

  if (result.length < 1) {
      document.querySelector('[data-list-message]').classList.add('list__message_show')
  } else {
      document.querySelector('[data-list-message]').classList.remove('list__message_show')
  }

  document.querySelector('[data-list-items]').innerHTML = ''
  const newItems = document.createDocumentFragment()

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
      const element = document.createElement('button')
      element.classList = 'preview'
      element.setAttribute('data-preview', id)
  
      element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
      `

      newItems.appendChild(element)
  }

  document.querySelector('[data-list-items]').appendChild(newItems)
  document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

  document.querySelector('[data-list-button]').innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
  `

  window.scrollTo({top: 0, behavior: 'smooth'});
  document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
  const fragment = document.createDocumentFragment()

  for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
      const element = document.createElement('button')
      element.classList = 'preview'
      element.setAttribute('data-preview', id)
  
      element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
      `

      fragment.appendChild(element)
  }

  document.querySelector('[data-list-items]').appendChild(fragment)
  page += 1
})


/**
* Handles the click event on a list item.
* @param {Event} event - The click event object.
*/
function handleListItemClick(event) {
  const active = findActiveBook(event);

  if (active) {
    openDataListActive();
    updateDataListBlur(active.image);
    updateDataListImage(active.image);
    updateDataListTitle(active.title);
    updateDataListSubtitle(active.author, active.published);
    updateDataListDescription(active.description);
  }
}

/**
 * Finds the active book based on the clicked element.
 * @param {Event} event - The click event object.
 * @returns {Object|null} - The active book object, or null if not found.
 */
function findActiveBook(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  return active;
}

/**
 * Opens the active data list.
 */
function openDataListActive() {
  const dataListActive = document.querySelector('[data-list-active]');
  dataListActive.open = true;
}

/**
 * Updates the blur image of the data list.
 * @param {string} image - The image source.
 */
function updateDataListBlur(image) {
  const dataListBlur = document.querySelector('[data-list-blur]');
  dataListBlur.src = image;
}

/**
 * Updates the main image of the data list.
 * @param {string} image - The image source.
 */
function updateDataListImage(image) {
  const dataListImage = document.querySelector('[data-list-image]');
  dataListImage.src = image;
}

/**
 * Updates the title of the data list.
 * @param {string} title - The title text.
 */
function updateDataListTitle(title) {
  const dataListTitle = document.querySelector('[data-list-title]');
  dataListTitle.innerText = title;
}

/**
 * Updates the subtitle of the data list.
 * @param {string} author - The author key.
 * @param {string} published - The published date.
 */
function updateDataListSubtitle(author, published) {
  const dataListSubtitle = document.querySelector('[data-list-subtitle]');
  dataListSubtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`;
}

/**
 * Updates the description of the data list.
 * @param {string} description - The description text.
 */
function updateDataListDescription(description) {
  const dataListDescription = document.querySelector('[data-list-description]');
  dataListDescription.innerText = description;
}

document.querySelector('[data-list-items]').addEventListener('click', handleListItemClick);
