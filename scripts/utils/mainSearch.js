import { filterRecipesBySearch } from "./filterRecipesBySearch.js";
import { displayRecipesCards } from "../pages/home.js";
import { dropdowns } from "../pages/home.js";
import { selectedTags } from "../pages/home.js";
import { allRecipes } from "../pages/home.js";
import { filterRecipesByTags } from "./filterRecipesByTag.js";
import { recipesFilteredByTag } from "./filterRecipesByTag.js";

export const mainSearch = () => {
    const searchInput = document.querySelector('#search-recipe');
    const btnDelete = document.querySelector('.header_cta div button');
    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');

    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase();
        btnDelete.style.display = searchInputValue.length > 0 ? 'block' : 'none';

        selectedTags.length > 0 ? filterRecipesBySearch(recipesFilteredByTag, searchInputValue) : filterRecipesBySearch(allRecipes, searchInputValue);

        //si le champs de recherche est vide et qu'il y a des tags sélectionnés, afficher les recettes correspondantes aux tags sélectionnés
        if (!searchInput.value && selectedTags.length > 0) filterRecipesByTags(allRecipes, selectedTags)

        //sinon, réinitialiser le contenu
        else if (!searchInput.value && selectedTags.length === 0) resetContent();
    };

    const resetContent = () => {
        cardSection.innerHTML = '';
        numberOfRecipes.textContent = `${allRecipes.length} recettes`;
        displayRecipesCards();
        dropdowns.forEach(dropdown => dropdown.resetItemList());
    };

    searchInput.addEventListener('input', updateContent);

    btnDelete.addEventListener('click', () => {
        searchInput.value = '';
        btnDelete.style.display = 'none';
        selectedTags.length > 0 ? filterRecipesByTags(allRecipes, selectedTags) : resetContent();
    });
};