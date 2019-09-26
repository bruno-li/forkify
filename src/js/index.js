/* eslint-disable no-undef */
/* eslint-disable no-console */
import Search from './models/Search';

/** Global state of the app
  * - Search object
  * - Current recipe object
  * - Shopping list object
  * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
  // get query from view
  const query = 'pizza'; // TODO

  if (query) {
    // new search object and add to state
    state.search = new Search(query);

    // set up UI to display results

    // search for recipes
    await state.search.getResults();

    // render results on UI
    console.log(state.search.results);
  }
};

// add event listener to UI search element
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
