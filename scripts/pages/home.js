import Api from '../api/Api.js';
import Recipe from '../models/Recipe.js';
import RecipeCard from '../components/RecipeCard.js';
import Dropdown from '../components/Dropdown.js'
import { openCloseDropdown } from '../utils/dropdownEvent.js';
import { mainSearch } from '../utils/mainSearch.js';
import { extractUniqueProperties } from '../utils/extractUniqueProperties.js';

const recipesApi = new Api('./data/recipes.json');
export const recipes = await recipesApi.get();

// Copie du tableau de recettes pour pouvoir filtrer les recettes en cours
export const currentRecipes = [...recipes];

// Fonction pour mettre à jour le tableau de recettes en cours
export const updateCurrentRecipes = filteredRecipes => { currentRecipes.splice(0, currentRecipes.length, ...filteredRecipes) };

export const selectedTags = [];

export const dropdowns = [];

export const searchInput = document.querySelector('#search-recipe');

const displayDropdownSection = async () => {
    const numberOfRecipes = document.querySelector('.recipes_count');
    numberOfRecipes.textContent = `${recipes.length} recettes`;

    dropdowns.push(new Dropdown('Ingrédients', extractUniqueProperties(recipes).ingredients));
    dropdowns.push(new Dropdown('Appareils', extractUniqueProperties(recipes).appliances));
    dropdowns.push(new Dropdown('Ustensiles', extractUniqueProperties(recipes).ustensils));

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
mainSearch(currentRecipes);