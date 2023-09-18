import Api from '../api/Api.js';
import Recipe from '../models/Recipe.js';
import RecipeCard from '../templates/RecipeCard.js';
import Dropdown from '../templates/Dropdown.js';
import { openCloseDropdown } from '../utils/dropdownEvent.js';
import { mainSearch } from '../utils/mainSearch.js';

const recipesApi = new Api('./data/recipes.json');
const recipes = await recipesApi.get();

const displayDropdownFilters = async () => {
    const templateDropdown = new Dropdown({ recipes });
    templateDropdown.createFilter();
};

export const displayRecipesCards = async () => {
    recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        })
};

displayDropdownFilters();
displayRecipesCards();
openCloseDropdown();
mainSearch(recipes);