/* eslint-disable no-undef */
/* eslint-disable no-console */

import Search from './models/Search';
// import from base.js elements and reusable functions
import { elements, renderLoader, clearLoader } from './views/base';

// export all variables from searchView module
import * as searchView from './views/searchView';

/** Global state of the app
  * - Search object
  * - Current recipe object
  * - Shopping list object
  * - Liked recipes
 */
const state = {};

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

    // 3.search for recipes
    await state.search.getResults();

    // 4.render UI with
    clearLoader();
    searchView.renderResults(state.search.results);
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
