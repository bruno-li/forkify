/* eslint-disable import/prefer-default-export */

// read from input form
import { elements } from './base';

// export the user input from search field
export const getInput = () => elements.searchInput.value;

// clear search input after a search
export const clearInput = () => {
  elements.searchInput.value = '';
};

// clear the results returned from user search
export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchRecipePages.innerHTML = '';
};

// truncate recipe title
export const limitReceipeTitle = (title, limit = 17) => {
  const newTitle = []; // to store a new array

  if (title.length > limit) {
    //  split the title sentences with space
    title.split(' ').reduce((acc, cur) => {
      // checks the sum of acc and the length of the current element are < than 17
      if (acc + cur.length <= limit) {
        // if it is, push word into newTitle array
        newTitle.push(cur);
      }
      // returns the sum of acc and the length of current element of the array
      return acc + cur.length;
    }, 0); // set initial accumulator value to 0

    // join them back into a sentence separated by space
    return `${newTitle.join(' ')} ...`;
  }

  return title;
};

// private function within the searchView module
const renderRecipe = (recipe) => {
  // create a <li> element for every recipe
  const markup = `
                 <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitReceipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                      </a>
                </li>
                  `;
    // insert li elements as child of result__list element at the end of parent element closing tag
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// creates the next and prev button. type: 'prev' or 'next'
const createButton = (page, type) => `
<!-- data-goTo attribute - allow us to link the pages to prev or next -->
 <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>

   <!-- render the current page in the button-->
    <span>Page ${type === 'prev' ? page - 1 : page + 1}
    </span>

<!-- renders the prev or next icon depending on the type variable value  -->
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`;

// render buttons for next page recipes
const renderButtons = (page, numResults, recipePerPage) => {
  /**  check how many page in total by dividing
  the total of recipes from the API call with how many recipe per page we want */
  const pages = Math.ceil(numResults / recipePerPage); // ceil method to round number up (4.1 = 5).

  let button;
  if (page === 1 && pages > 1) {
    // Only button to go next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both buttons available
    button = `
      ${createButton(page, 'prev')}
       ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only buttin to go to prev page
    button = createButton(page, 'prev');
  }

  // insert the elements create to the DOM
  elements.searchRecipePages.insertAdjacentHTML('afterBegin', button);
};

export const renderResults = (recipes, page = 1, recipesPerPage = 10) => {
  // render only 10 recipes per page
  const start = (page - 1) * recipesPerPage; // variable to store the start index of the array
  const end = page * recipesPerPage; // variable to store the last index per page to allow only 10

  // 1. slice the recipes to create a new array with max 10 recipes
  // 2. loop through result, and call renderRecipe function and pass every recipe from the object
  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, recipesPerPage);
};
