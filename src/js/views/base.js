/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

//* ***** resusable variables and functions *****/

// select and export all our DOM elements
export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
  searchRecipePages: document.querySelector('.results__pages'),
};

// re-usable loader from CSS loader class
export const elementStrings = {
  loader: 'loader',
};

// Render loading spinner by inserting a div element to the parent element
// then set the class to the loader class in CSS
export const renderLoader = (parent) => {
  const loader = `
    <div class ="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw">
        </use>
      </svg>
    </div>
  `;
  // attached the div element to the parent element
  parent.insertAdjacentHTML('afterbegin', loader);
};

// clears the loader if no date needs to be retrived
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  // to remove a child, move up the parent element first
  if (loader) loader.parentElement.removeChild(loader);
};
