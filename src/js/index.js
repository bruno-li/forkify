/* eslint-disable no-undef */
/* eslint-disable no-console */

import Search from './models/Search';
import { elements } from './views/base';
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
    // new search object and add to state
    state.search = new Search(query);

    // set up UI to display results
    searchView.clearInput();
    searchView.clearResults();

    // search for recipes
    await state.search.getResults();

    // render UI with
    searchView.renderResults(state.search.results);
  }
};

// add event listener to UI search element
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
