import Api from '../api/Api.js';
import Recipe from '../models/Recipe.js';
import RecipeCard from '../components/RecipeCard.js';
import Dropdown from '../components/Dropdown.js'
import { openCloseDropdown } from '../utils/dropdownEvent.js';
import { mainSearch } from '../utils/mainSearch.js';
import { extractUniqueProperties } from '../utils/extractUniqueProperties.js';
import { normalizeString } from '../utils/normalizeString.js';
import { wordsToRemoved } from '../utils/wordsToRemoved.js';

const recipesApi = new Api('./data/recipes.json');
export const allRecipes = await recipesApi.get();

// Copie du tableau de recettes pour pouvoir filtrer les recettes en cours
export const currentRecipes = [...allRecipes];

// Fonction pour mettre à jour le tableau de recettes en cours
export const updateCurrentRecipes = filteredRecipes => { currentRecipes.splice(0, currentRecipes.length, ...filteredRecipes) };

export const selectedTags = [];

export const dropdowns = [];

export const searchInput = document.querySelector('#search-recipe');

// Prétraitement des recettes
const preprocessedRecipes = allRecipes.map(recipe => {
    const { name, description, ingredients } = recipe;
    const normalizedIngredients = ingredients
        .map(ingredient => ingredient.ingredient)
        .join(" ");
    const normalizedWordsToFilter = [normalizeString(name), normalizeString(description), normalizeString(normalizedIngredients)];
    return {
        id: recipe.id,
        normalizedWordsToFilter
    };
});

// Extraction des mots clés uniques
const allWords = [];
preprocessedRecipes.forEach(recipe => {
    const wordsToFilter = recipe.normalizedWordsToFilter;
    wordsToFilter.forEach(words => {
        const wordsArray = words.split(" ");
        wordsArray.forEach(word => {
            if (!wordsToRemoved.includes(word) && word.length > 2) allWords.push(word);
        });
    });
});

// Suppression des doublons
const uniqueWords = [...new Set(allWords)].sort();

// Stockage des mots clés et des recettes correspondantes
export const organizeRecipesByKeywords = uniqueWords.map(word => {
    const idList = [];
    preprocessedRecipes.forEach(recipe => {
        if (recipe.normalizedWordsToFilter.some(words => words.includes(word))) idList.push(recipe.id);
    });
    return {
        word, 
        recipes: idList
    };
});

const displayDropdownSection = async () => {
    const numberOfRecipes = document.querySelector('.recipes_count');
    numberOfRecipes.textContent = `${allRecipes.length} recettes`;

    dropdowns.push(new Dropdown('Ingrédients', extractUniqueProperties(allRecipes).ingredients));
    dropdowns.push(new Dropdown('Appareils', extractUniqueProperties(allRecipes).appliances));
    dropdowns.push(new Dropdown('Ustensiles', extractUniqueProperties(allRecipes).ustensils));

    const filterSection = document.querySelector('.filter_section');
    dropdowns.forEach(dropdown => filterSection.insertBefore(dropdown.createDropdown(), numberOfRecipes));
};

export const displayRecipesCards = async () => {
    allRecipes
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