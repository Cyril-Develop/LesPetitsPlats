import RecipeCard from "../templates/RecipeCard.js";
import { displayRecipesCards } from "../pages/home.js";
import { normalizeString } from "./normalizeString.js";

export const mainSearch = (recipes, dropdowns) => {
    const searchInput = document.querySelector('#search-recipe');
    const btnDelete = document.querySelector('.header_cta div button');
    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');

    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase();
        if (searchInputValue.length >= 3) {
            btnDelete.style.display = 'block';
            filterRecipes(recipes, searchInputValue, cardSection, numberOfRecipes, dropdowns);
        } else {
            btnDelete.style.display = 'none';
            resetContent(cardSection, numberOfRecipes);
        }
    };

    const resetContent = () => {
        cardSection.innerHTML = '';
        numberOfRecipes.textContent = `${recipes.length} recettes`;
        displayRecipesCards();
        dropdowns.forEach(dropdown => dropdown.resetItemList());
    };

    searchInput.addEventListener('input', updateContent);

    btnDelete.addEventListener('click', () => {
        searchInput.value = '';
        btnDelete.style.display = 'none';
        resetContent(cardSection, numberOfRecipes);
    });
};

const filterRecipes = (recipes, inputValue, cardSection, numberOfRecipes, dropdowns) => {
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

    if (!filteredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
        numberOfRecipes.textContent = ``;
    } else {
        cardSection.innerHTML = "";
        numberOfRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;

        filteredRecipes.forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        });
    };

    const filteredItems = extractFilteredItems(filteredRecipes);

    dropdowns.forEach(dropdown => dropdown.updateItems(filteredItems, inputValue));
};

const extractFilteredItems = filteredRecipes => {
    const filteredItems = [];

    filteredRecipes.forEach(recipe => {
        filteredItems.push(normalizeString(recipe.appliance));

        recipe.ustensils.forEach(ustensil => filteredItems.push(normalizeString(ustensil)));

        recipe.ingredients.forEach(ingredient => filteredItems.push(normalizeString(ingredient.ingredient)));
    });

    return filteredItems;
};