import { normalizeString } from "./normalizeString.js";

export const extractFilteredItems = filteredRecipes => {
    const filteredItems = [];

    filteredRecipes.forEach(recipe => {
        filteredItems.push(normalizeString(recipe.appliance));

        recipe.ustensils.forEach(ustensil => filteredItems.push(normalizeString(ustensil)));

        recipe.ingredients.forEach(ingredient => filteredItems.push(normalizeString(ingredient.ingredient)));
    });

    return filteredItems;
};