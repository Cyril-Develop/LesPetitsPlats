import Api from '../api/Api.js';
import Recipe from '../models/Recipe.js';
import RecipeCard from '../templates/RecipeCard.js';
import Filter from '../templates/Filter.js';
import { opencloseFilter } from '../utils/filter.js';

const recipesApi = new Api('./data/recipes.json');
const recipes = await recipesApi.get();

const displayFilters = async () => {
    const filter = new Filter({ recipes });
    filter.createFilter();
};

const displayRecipes = async () => {
    recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        })
};


displayFilters();
displayRecipes();
opencloseFilter();