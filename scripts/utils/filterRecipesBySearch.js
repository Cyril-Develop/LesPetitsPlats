import { normalizeString } from "./normalizeString.js";
import { updateCurrentRecipes } from "../pages/home.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";

export const filterRecipesBySearch = (recipes, inputValue) => {
    const normalizedInputValue = normalizeString(inputValue);

    const filteredRecipes = recipes.filter(recipe => {
        const { description, ingredients, name } = recipe;

        return (
            normalizeString(description).includes(normalizedInputValue) ||
            ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedInputValue)) ||
            normalizeString(name).includes(normalizedInputValue)
        );
    });

    updateCurrentRecipes(filteredRecipes);

    updateWithFilteredRecipes(filteredRecipes);
};