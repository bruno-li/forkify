/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
// food2fork api key: f685d6d569cfa0917bb9b449c3ee5c72
// search url : https://www.food2fork.com/api/search
import axios from 'axios';

async function getResults(query) {
  const key = 'f685d6d569cfa0917bb9b449c3ee5c72';
  try {
    const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const { recipes } = res.data;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}

getResults('chicken');
