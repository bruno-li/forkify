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

export const renderResults = (recipes) => {
  // loop through result, and call renderRecipe function and pass every recipe from the object
  recipes.forEach(renderRecipe);
};
