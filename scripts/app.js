import { recipes } from "../data/recipes.js";
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', () => {
    const searchInputValue = searchInput.value.toLowerCase();
    if (searchInputValue.length >= 3) rechercheRecettes(searchInputValue);
});

//BOUCLE CLASSIQUE
function rechercheRecettes(champRecherche) {
    const resultats = [];

    for (let i = 0; i < recipes.length; i++) {
        const recette = recipes[i];
        const { appliance, ustensils, ingredients, name } = recette;
        const applianceLower = appliance.toLowerCase();
        const nameLower = name.toLowerCase();

        // Vérifie si le champ de recherche est présent dans l'appareil ou le nom
        if (chercheDansChaine(applianceLower, champRecherche) || chercheDansChaine(nameLower, champRecherche)) {
            //récupére le dernier index du tableau et ajoute la recette
            resultats[resultats.length] = recette;
        } else {
            // Vérifie les ustensiles en utilisant une boucle for
            let ustensilsFound = false;
            for (let j = 0; j < ustensils.length; j++) {
                const ustensil = ustensils[j].toLowerCase();
                if (chercheDansChaine(ustensil, champRecherche)) {
                    ustensilsFound = true;
                    break;
                }
            }

            let ingredientsFound = false;
            for (let k = 0; k < ingredients.length; k++) {
                console.log(ingredients[k]);
                const ingredient = ingredients[k].ingredient.toLowerCase();
                if (chercheDansChaine(ingredient, champRecherche)) {
                    ingredientsFound = true;
                    break;
                }
            }

            // Si le champ de recherche est trouvé dans ustensils ou ingrédients, ajoutez la recette
            if (ustensilsFound || ingredientsFound) {
                resultats[resultats.length] = recette;
            }
        }
    }

    if (!resultats.length) console.log("Aucune recette trouvée.");
    else {
        console.log("Recettes correspondantes :");
        console.log(resultats);
    }
}

// Fonction utilitaire
function chercheDansChaine(chaine, champRecherche) {
    //évite de rechercher lorsque seulement 2 caractères sont restants, inutile étant donné que champRecherche ne peut pas s'y trouver complètement.
    for (let i = 0; i <= chaine.length - champRecherche.length; i++) {
        let correspond = true;
        for (let j = 0; j < champRecherche.length; j++) {
            if (chaine[i + j] !== champRecherche[j]) {
                correspond = false;
                break;
            }
        }
        if (correspond) return true;
    }
    return false;
}