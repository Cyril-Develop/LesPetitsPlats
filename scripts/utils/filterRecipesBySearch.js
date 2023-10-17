import { normalizeString } from "./normalizeString.js";
import { updateCurrentRecipes } from "../pages/home.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";

export const filterRecipesBySearch = (recipes, inputValue) => {
    const normalizedInputValue = normalizeString(inputValue);

    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const { description, ingredients, name } = recipe;

        if (normalizeString(description).indexOf(normalizedInputValue) !== -1) {
            filteredRecipes.push(recipe);
        } else {
            let found = false;
            for (let j = 0; j < ingredients.length; j++) {
                if (normalizeString(ingredients[j].ingredient).indexOf(normalizedInputValue) !== -1) {
                    filteredRecipes.push(recipe);
                    found = true;
                    break;
                }
            }
            if (found) continue;

            if (normalizeString(name).indexOf(normalizedInputValue) !== -1) {
                filteredRecipes.push(recipe);
            }
        };
    };

    updateCurrentRecipes(filteredRecipes);

    updateWithFilteredRecipes(filteredRecipes);
};