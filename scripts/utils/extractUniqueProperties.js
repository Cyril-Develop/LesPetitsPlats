export const  extractUniqueProperties = recipes => {
    const ingredients = new Set();
    const appliances = new Set();
    const ustensils = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredients.add(ingredient.ingredient.toLowerCase()));
            
        appliances.add(recipe.appliance.toLowerCase());

        recipe.ustensils.forEach(ustensil => ustensils.add(ustensil.toLowerCase()));
            
    });

    const ingredientsArray = Array.from(ingredients);
    const appliancesArray = Array.from(appliances);
    const ustensilsArray = Array.from(ustensils);

    return {
        ingredients: ingredientsArray,
        appliances: appliancesArray,
        ustensils: ustensilsArray
    };
};