import { normalizeString } from "./normalizeString.js";
import { updateCurrentRecipes } from "../pages/home.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";

export const filterRecipesBySearch = (recipes, inputValue) => {
    const normalizedInputValue = normalizeString(inputValue);

    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const { appliance, ustensils, ingredients, name } = recipe;

        if (normalizeString(appliance).indexOf(normalizedInputValue) !== -1) {
            filteredRecipes.push(recipe);
        } else {
            let found = false;
            for (let j = 0; j < ustensils.length; j++) {
                if (normalizeString(ustensils[j]).indexOf(normalizedInputValue) !== -1) {
                    filteredRecipes.push(recipe);
                    found = true;
                    break;
                }
            }
            if (found) continue;

            for (let k = 0; k < ingredients.length; k++) {
                if (normalizeString(ingredients[k].ingredient).indexOf(normalizedInputValue) !== -1) {
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