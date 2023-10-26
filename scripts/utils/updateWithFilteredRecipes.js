import RecipeCard from "../components/RecipeCard.js";
import Recipe from "../models/Recipe.js";
import { extractFilteredItems } from "./extractFilteredItems.js";
import { dropdowns } from "../pages/home.js";

export const updateWithFilteredRecipes = filteredRecipes => {

    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');
    
    if (!filteredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
        numberOfRecipes.textContent = ``;
    } else {
        cardSection.innerHTML = "";
        numberOfRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;

        filteredRecipes
            .map(recipe => new Recipe(recipe))
            .forEach(recipe => {
                const templateCard = new RecipeCard(recipe);
                templateCard.createCard();
            });
    };

    const filteredItems = extractFilteredItems(filteredRecipes);

    dropdowns.forEach(dropdown => dropdown.updateItems(filteredItems));
};