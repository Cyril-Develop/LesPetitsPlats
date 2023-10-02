import { normalizeString } from "./normalizeString.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";
import { dropdowns } from "../pages/home.js";

export const filterRecipesByTag = (recipes, tags, cardSection, numberOfRecipes) => {
    console.log(recipes);
    const filteredRecipes = recipes.filter(recipe => {
        const { appliance, ustensils, ingredients } = recipe;
        const normalizedAppliance = normalizeString(appliance);

        const normalizedTags = tags.map(tag => normalizeString(tag));

        return (
            normalizedAppliance.includes(normalizedTags) ||
            ustensils.some(ustensil => normalizeString(ustensil).includes(normalizedTags)) ||
            ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedTags))
        );
    });

    dropdowns.forEach(dropdown => dropdown.updateRecipes(filteredRecipes));
    updateWithFilteredRecipes(filteredRecipes, cardSection, numberOfRecipes);
};