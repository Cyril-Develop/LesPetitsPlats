import { filterRecipesBySearch } from "./filterRecipesBySearch.js";
import { displayRecipesCards } from "../pages/home.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";
import { dropdowns } from "../pages/home.js";

export const mainSearch = recipes => {
    const searchInput = document.querySelector('#search-recipe');
    const btnDelete = document.querySelector('.header_cta div button');
    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');

    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase();
        if (searchInputValue.length >= 3) {
            btnDelete.style.display = 'block';
            const filteredRecipesBySearch = filterRecipesBySearch(recipes, searchInputValue);
            updateWithFilteredRecipes(filteredRecipesBySearch, cardSection, numberOfRecipes);
        } else {
            btnDelete.style.display = 'none';
            resetContent(cardSection, numberOfRecipes);
        }
    };

    const resetContent = () => {
        cardSection.innerHTML = '';
        numberOfRecipes.textContent = `${recipes.length} recettes`;
        displayRecipesCards();
        dropdowns.forEach(dropdown => dropdown.resetItemList());
    };

    searchInput.addEventListener('input', updateContent);

    btnDelete.addEventListener('click', () => {
        searchInput.value = '';
        btnDelete.style.display = 'none';
        resetContent(cardSection, numberOfRecipes);
    });
};