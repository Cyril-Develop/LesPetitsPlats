import { normalizeString } from "./normalizeString.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";
import { updateCurrentRecipes } from "../pages/home.js";

export let recipesFilteredByTag = [];

export const filterRecipesByTags = (recipes, tags) => {

    const filteredRecipes = recipes.filter(recipe => {
        const { appliance, ustensils, ingredients } = recipe;

        const normalizedTags = tags.map(tag => normalizeString(tag));

        // Vérifie que tous les tags sont présents dans la recette
        return (
            normalizedTags.every(tag => 
                normalizeString(appliance).includes(tag) ||
                ustensils.some(ustensil => normalizeString(ustensil).includes(tag)) ||
                ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(tag))
            )
        );
    });

    recipesFilteredByTag = filteredRecipes;
    
    updateCurrentRecipes(filteredRecipes);

    updateWithFilteredRecipes(filteredRecipes);
};