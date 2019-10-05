/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import axios from 'axios';
import { key } from '../config';


export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  // fetch recipe from API and store to result variable
  async getRecipe() {
    try {
      const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      alert('something went wrong, check your internet');
    }
  }

  calcTime() {
    // assuming that we need 15 mins for each 3 ingredients
    // retrive the ingredient array list length
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
