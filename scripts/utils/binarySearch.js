
import { updateCurrentRecipes } from "../pages/home.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";
import { allRecipes } from "../pages/home.js";
//Recherche dichotomique
export const  binarySearch = (keywords, searchValue) => {
    let min = 0;
    let max = keywords.length - 1;

    const matchingRecipeIds = [];

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        const keyword = keywords[mid].word.slice(0, searchValue.length);

        if (keyword === searchValue) {
            // Correspondance trouvée, ajoutez les identifiants des recettes correspondantes
            matchingRecipeIds.push(...keywords[mid].recipes);

            // Recherche au-dessus et en dessous
            let indexAbove = mid - 1;
            let indexBelow = mid + 1;

            while (indexAbove >= 0 && keywords[indexAbove].word.startsWith(searchValue)) {
                matchingRecipeIds.push(...keywords[indexAbove].recipes);
                indexAbove--;
            }

            while (indexBelow < keywords.length && keywords[indexBelow].word.startsWith(searchValue)) {
                matchingRecipeIds.push(...keywords[indexBelow].recipes);
                indexBelow++;
            }

            // Sortie de la boucle une fois la recherche terminée
            break;
        } else if (keyword < searchValue) {
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }

    const filteredRecipes = allRecipes.filter(recipe => matchingRecipeIds.includes(recipe.id));

    updateCurrentRecipes(filteredRecipes);

    updateWithFilteredRecipes(filteredRecipes);
};