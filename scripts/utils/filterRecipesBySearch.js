import { normalizeString } from "./normalizeString.js";
import { dropdowns } from "../pages/home.js";

export const filterRecipesBySearch = (recipes, inputValue) => {
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

    dropdowns.forEach(dropdown => dropdown.updateRecipes(filteredRecipes));

    return filteredRecipes;
};