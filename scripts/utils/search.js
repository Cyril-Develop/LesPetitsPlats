import RecipeCard from "../templates/RecipeCard.js";
import { displayRecipesCards } from "../pages/home.js";

export const getInputValue = (recipes) => {
    const searchInput = document.querySelector('#search-recipe');
    searchInput.addEventListener('input', () => {
        const searchInputValue = searchInput.value.toLowerCase();
        if (searchInputValue.length >= 3) searchRecipe(recipes, searchInputValue);
        else {
            cardSection.innerHTML = "";
            numberOfRecipes.textContent = `${recipes.length} recettes`;
            displayRecipesCards();
        } 
    });
};

const cardSection = document.querySelector('.card_section');
const numberOfRecipes = document.querySelector('.recipes_count');
function searchRecipe(recipes, inputValue) {
    const result = [];

    recipes.forEach(recipe => {
        const { appliance, ustensils, ingredients, name } = recipe;

        if (
            appliance.toLowerCase().includes(inputValue) ||
            ustensils.some(ustensil => ustensil.toLowerCase().includes(inputValue)) ||
            ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue)) ||
            name.toLowerCase().includes(inputValue)
        ) {
            result.push(recipe);
        }
    });

    result.length > 1 ? numberOfRecipes.textContent = `${result.length} recettes` : numberOfRecipes.textContent = `${result.length} recette`
    if(!result.length) {
        numberOfRecipes.textContent = ``;
        cardSection.innerHTML = "Aucune recette n'a été trouvée.";
    } 
    else {
        cardSection.innerHTML = "";
        result.forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        });
    }
};