import { filterRecipesBySearch } from "./filterRecipesBySearch.js";
import { displayRecipesCards } from "../pages/home.js";
import { dropdowns } from "../pages/home.js";
import { selectedTags } from "../pages/home.js";
import { recipes } from "../pages/home.js";
import { currentRecipes } from "../pages/home.js";
import { filterRecipesByTags } from "./filterRecipesByTag.js";

export const mainSearch = () => {
    const searchInput = document.querySelector('#search-recipe');
    const btnDelete = document.querySelector('.header_cta div button');
    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');

    const isTagSelected = selectedTags.length > 0;

    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase();
        btnDelete.style.display = searchInputValue.length > 0 ? 'block' : 'none';

        filterRecipesBySearch(currentRecipes, searchInputValue);

        //si le champs de recherche est vide et qu'il y a des tags sélectionnés, afficher les recettes correspondantes aux tags sélectionnés
        if (!searchInput.value && isTagSelected) filterRecipesByTags(recipes, selectedTags)

        //sinon, réinitialiser le contenu
        else if (!searchInput.value && !isTagSelected) resetContent();
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
        //Si au clique sur le bouton supprimer, il y a des tags sélectionnés, afficher les recettes correspondantes aux tags sélectionnés
        // sinon, réinitialiser le contenu
        isTagSelected ? filterRecipesByTags(recipes, selectedTags) : resetContent();
    });
};