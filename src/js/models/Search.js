/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
// food2fork api key: f685d6d569cfa0917bb9b449c3ee5c72
// search url : https://www.food2fork.com/api/search

// import axios library for fetching data
import axios from 'axios';
import { key } from '../config';

// export Search module class
export default class Search {
  constructor(query) {
    this.query = query;
  }

  // call API information needed
  async getResults() {
    // attempt to fetch data with a user query
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      // stores object (recipes) received from API in the results variable
      this.results = res.data.recipes;

      console.log(this.results);
    } catch (error) {
      alert(error);
    }
  }
}
