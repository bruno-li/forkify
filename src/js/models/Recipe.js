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
      // return a promise from the API call
      const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      alert(`${error}recipe`);
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

  parseIngredients() {
    // 2 array of strings to replace the long names returned from API
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

    // loop  ingredients array from API and store in a new array newIngredients
    const newIngredients = this.ingredients.map((el) => {
      // 1) Uniform units, make sure they are all lower characters
      let ingredient = el.toLowerCase();

      // loop unitsLong array then replace the current ingredient with the unitsShort array
      // then modify ingredient array replace units return from API with unitsShort array
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses with a regex
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3) split ingredients into a new array
      const arrIng = ingredient.split(' ');
      // check if array arrIng contains the units from unitsShort
      const unitIndex = arrIng.findIndex((el2) => unitsShort.includes(el2));

      // declare object for storing
      let objIng;

      // check if unitIndex returns fals (-1), if not proceed
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count; // variable to store intenger number of ingredients

        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }
        // initialize the object with the correct format
        objIng = {
          // get the count from the eval above
          count,
          // assign short unit: tbsp, tsp, oz, etc...
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but 1st element is number
        objIng = {
          // if sucessufully parsed, it means 1st element is a number
          count: parseInt(arrIng[0], 10),
          // no unit necessary, add a space
          unit: '',
          // get the rest of the ingredient after the 1st element number
          ingredient: arrIng.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          // if no unit or number leave count as 1. Ex. 1 tomato, 1 can
          count: 1,
          // no unit necessary, add a space
          unit: '',
          // get the ingredients and assign to property
          ingredient,
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}
