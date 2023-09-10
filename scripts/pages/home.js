import Api from '../api/Api.js';
import Recipe from '../models/Recipe.js';
import RecipeCard from '../templates/recipe.js';
import { opencloseFilter } from '../utils/filter.js';

const cardSection = document.querySelector('.card_section');
const recipesApi = new Api('./data/recipes.json');

const displayRecipes = async () => {
    const recipes = await recipesApi.get();
    recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const template = new RecipeCard(recipe);
            template.createCard();
        })
};

displayRecipes();
opencloseFilter();