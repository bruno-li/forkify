/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import Search from './models/Search';
// import from base.js elements and reusable functions
import { elements, renderLoader, clearLoader } from './views/base';
// import all variables from searchView module
import * as searchView from './views/searchView';
// import the recipe fetched from API
import Recipe from './models/Recipe';

/** Global state of the app
  * - Search object
  * - Current recipe object
  * - Shopping list object
  * - Liked recipes
 */
const state = {};


/** ***************
* SEARCH CONTROLLER
* ************** */

// fires up if user enter a search query
const controlSearch = async () => {
  // get query from view
  const query = searchView.getInput();


  // check if query was entered
  if (query) {
    // 1.new search object and add to state
    state.search = new Search(query);

    // 2.set up UI to display results
    // clear previous search
    searchView.clearInput();
    searchView.clearResults();
    // attach the loader to the parent element once user hit search
    renderLoader(elements.searchRes);

    try {
      // 3.search for recipes
      await state.search.getResults();

      // 4.render UI with
      searchView.renderResults(state.search.results);
    } catch (error) {
      alert('Something went wrong with your search!');
      clearLoader();
    }
  }
};

// add event listener to UI search element
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});


// event delegation to the parent to listen for dynamic pagination buttons
elements.searchRecipePages.addEventListener('click', (e) => {
  // use closest method to allow user to click only the buttons and no the icons or text
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    // read the data attribute from element and stores in the variable
    const goToPage = parseInt(btn.dataset.goto, 10);
    // clear the search results
    searchView.clearResults();

    searchView.renderResults(state.search.results, goToPage);
  }
});

/** ***************
* RECIPE CONTROLLER
* ************** */

const controlRecipe = async () => {
  // get the hash URL and store in the variable id
  // then we use String replace method to take out the '#' and only get the id number
  const id = window.location.hash.replace('#', '');

  // verify if an id exists
  if (id) {
    // prepare UI for changes

    // create new recipe object and store in the state object as a property
    state.recipe = new Recipe(id);

    try {
      // get recipe data asynchronous from API to return a promise
      await state.recipe.getRecipe();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();


      // render recipe to UI
    } catch (error) {
      alert('error processing recipe');
    }
  }
};

// attach event listener to window object to use haschange to read from the page URL
// if the hash changes this event will fire and call controlRecipe function
// use a foreach to add both events in a single line
// load event will load the recipe when the browser reloads or load the first time
['haschange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

// code above would be the same as below
/**
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
 */
