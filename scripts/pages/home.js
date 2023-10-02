import Api from '../api/Api.js';
import Recipe from '../models/Recipe.js';
import RecipeCard from '../templates/RecipeCard.js';
import Dropdown from '../templates/Dropdown.js'
import { openCloseDropdown } from '../utils/dropdownEvent.js';
import { mainSearch } from '../utils/mainSearch.js';
import { extractUniqueProperties } from '../utils/extractUniqueProperties.js';

const recipesApi = new Api('./data/recipes.json');
const recipes = await recipesApi.get();

export const dropdowns = [];

const displayDropdownSection = async () => {
    const numberOfRecipes = document.querySelector('.recipes_count');
    numberOfRecipes.textContent = `${recipes.length} recettes`;

    dropdowns.push(new Dropdown('Ingrédients', extractUniqueProperties(recipes).ingredients, recipes));
    dropdowns.push(new Dropdown('Appareils', extractUniqueProperties(recipes).appliances, recipes));
    dropdowns.push(new Dropdown('Ustensiles', extractUniqueProperties(recipes).ustensils, recipes));

    const filterSection = document.querySelector('.filter_section');
    dropdowns.forEach(dropdown => filterSection.insertBefore(dropdown.createDropdown(), numberOfRecipes));
};

export const displayRecipesCards = async () => {
    recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        })
};

displayDropdownSection();
displayRecipesCards();
openCloseDropdown();
mainSearch(recipes);