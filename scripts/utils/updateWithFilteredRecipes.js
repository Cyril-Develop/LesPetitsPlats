import RecipeCard from "../templates/RecipeCard.js";
import { extractFilteredItems } from "./extractFilteredItems.js";
import { dropdowns } from "../pages/home.js";

export const updateWithFilteredRecipes = (filteredRecipes, cardSection, numberOfRecipes) => {
    
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

    const filteredItems = extractFilteredItems(filteredRecipes);

    dropdowns.forEach(dropdown => dropdown.updateItems(filteredItems));
};
