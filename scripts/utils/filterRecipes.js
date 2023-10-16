import { normalizeString } from "./normalizeString.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";
import { updateCurrentRecipes } from "../pages/home.js";
import { allRecipes } from "../pages/home.js";

export const filterRecipes = (recipes, tags, inputValue) => {
    const normalizedTags = tags.map(tag => normalizeString(tag));
    const normalizedInputValue = normalizeString(inputValue);

    const filteredRecipes = recipes.filter(recipe => {
        const { appliance, ustensils, ingredients, name } = recipe;

        // Vérifie que tous les tags sont présents dans la recette (uniquement s'il y a des tags)
        const tagsMatch = normalizedTags.length === 0 || normalizedTags.every(tag =>
            normalizeString(appliance).includes(tag) ||
            ustensils.some(ustensil => normalizeString(ustensil).includes(tag)) ||
            ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(tag))
        );

        // Vérifie que la recherche est présente dans la recette (uniquement si le champs de recherche n'est pas vide)
        const searchMatch = !normalizedInputValue || (
            normalizeString(appliance).includes(normalizedInputValue) ||
            ustensils.some(ustensil => normalizeString(ustensil).includes(normalizedInputValue)) ||
            ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedInputValue)) ||
            normalizeString(name).includes(normalizedInputValue)
        );

        return tagsMatch && searchMatch;
    });

    updateCurrentRecipes(allRecipes);

    updateWithFilteredRecipes(filteredRecipes);
};
