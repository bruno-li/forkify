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

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

    // loop through the array with map and create a new array with newIngredients
    const newIgredients = this.ingredients.map((el) => {
      // uniform units, make sure they are all lowercase
      let ingredient = el.toLowerCase();
      // loops to the unitLong array and replace with the short version then add to ingredient array
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, unitsShort[index]);
      });


      // remove the parentheses from the data received from API with a regular expression
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


      // Parse ingredients into cound, unit and ingredient
      const arrIngredient = ingredient.split(' ');
      // check if the unit exists within the array with findIndex and includes method
      // then returns the index position of the element
      const unitIndex = arrIngredient.findeIndex((el2) => unitsShort.includes(el2));

      // variable to store the recipe obj
      let objIngre;
      // check if unitIndex found the element index. if false it would return -1
      if (unitIndex > -1) {
        // there is a unit

      } else if (parseInt(arrIngredient[0], 10)) {
        // there is no unit, but 1st element is a number
        objeIngre = {
          // get only the first element if recipe has a number
          count: parseInt(arrIngredient[0], 10),
          unit: '',
          // get the rest of the element of the array except the first element
          ingredient: arrIngredient.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        // there is no unit and no number in 1st position
        objeIngre = {
          count: 1,
          unit: '',
          // if no unit found, it will return the entire ingredient list
          ingredient,
        };
      }

      return objIngre;
    });
  }
}
