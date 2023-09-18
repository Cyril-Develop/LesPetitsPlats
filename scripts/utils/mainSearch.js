import RecipeCard from "../templates/RecipeCard.js";
import Dropdown from "../templates/Dropdown.js";
import { displayRecipesCards } from "../pages/home.js";
import { normalizeString } from "./normalizeString.js";

export const mainSearch = recipes => {
    const searchInput = document.querySelector('#search-recipe');
    const btnDelete = document.querySelector('.header_cta div button');

    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase();
        if (searchInputValue.length >= 3) {
            btnDelete.style.display = 'block';
            searchRecipe(recipes, searchInputValue);
        } else {
            btnDelete.style.display = 'none';
            resetContent();
        };
    };

    const resetContent = () => {
        cardSection.innerHTML = '';
        numberOfRecipes.textContent = `${recipes.length} recettes`;
        displayRecipesCards();
    };

    searchInput.addEventListener('input', updateContent);

    btnDelete.addEventListener('click', () => {
        searchInput.value = '';
        btnDelete.style.display = 'none';
        resetContent();
    });
};

const cardSection = document.querySelector('.card_section');
const numberOfRecipes = document.querySelector('.recipes_count');

const searchRecipe = (recipes, inputValue) => {
    const normalizedInputValue = normalizeString(inputValue);

    const filteredRecipes = recipes.filter(recipe => {
        const { appliance, ustensils, ingredients, name } = recipe;
        const normalizedAppliance = normalizeString(appliance);
        const normalizedName = normalizeString(name);

        return (
            normalizedAppliance.includes(normalizedInputValue) ||
            ustensils.some(ustensil => normalizeString(ustensil).includes(normalizedInputValue)) ||
            ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedInputValue)) ||
            normalizedName.includes(normalizedInputValue)
        );
    });

    // méthode statique de la classe Dropdown
    Dropdown.updateDropdowns(filteredRecipes);

    if (!filteredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
        numberOfRecipes.textContent = ``;
    } else {
        cardSection.innerHTML = "";
        numberOfRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;

        filteredRecipes.forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        });
    };
};