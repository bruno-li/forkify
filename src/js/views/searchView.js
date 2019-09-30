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
                            <h4 class="results__name">${recipe.title}</h4>
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
