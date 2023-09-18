import { normalizeString } from '../utils/normalizeString.js';

export default class Dropdown {
    constructor(data) {
        this.allRecipes = data.recipes;
        this.ingredients = new Set();
        this.appliances = new Set();
        this.ustensils = new Set();
    }
    extractUniqueProperties() {
        this.allRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                this.ingredients.add(ingredient.ingredient.toLowerCase());
            });

            this.appliances.add(recipe.appliance.toLowerCase());

            recipe.ustensils.forEach(ustensil => {
                this.ustensils.add(ustensil.toLowerCase());
            });
        });
    }
    createFilter() {
        this.extractUniqueProperties();

        // Ensembles (Sets) en tableaux
        const ingredientsArray = Array.from(this.ingredients);
        const appliancesArray = Array.from(this.appliances);
        const ustensilsArray = Array.from(this.ustensils);

        const numberOfRecipes = document.querySelector('.recipes_count');
        numberOfRecipes.textContent = `${this.allRecipes.length} recettes`;

        const ingredientsDropdown = this.createFilterDropdown('Ingrédients', ingredientsArray, 'ingredients');
        const appliancesDropdown = this.createFilterDropdown('Appareils', appliancesArray, 'appliances');
        const ustensilsDropdown = this.createFilterDropdown('Ustensiles', ustensilsArray, 'ustensils');

        const filterSection = document.querySelector('.filter_section');

        filterSection.insertBefore(ingredientsDropdown, numberOfRecipes);
        filterSection.insertBefore(appliancesDropdown, numberOfRecipes);
        filterSection.insertBefore(ustensilsDropdown, numberOfRecipes);
    }
    static updateDropdowns(filteredRecipes) {
        console.log(filteredRecipes);
    }
    search(inputElement, itemList) {
        inputElement.addEventListener('input', () => {
            const inputValue = normalizeString(inputElement.value.toLowerCase());
            const items = itemList.querySelectorAll('li');
            const btnDelete = inputElement.nextElementSibling;

            this.toggleDeleteButton(btnDelete, inputElement, items);
            this.filterItems(inputValue, items);
        });
    }
    toggleDeleteButton(btnDelete, inputElement, items) {
        const inputValue = normalizeString(inputElement.value.toLowerCase());
        if (inputValue) {
            btnDelete.style.display = 'block';
            btnDelete.addEventListener('click', () => {
                inputElement.value = '';
                btnDelete.style.display = 'none';
                this.showAllItems(items);
            });
        } 
        else btnDelete.style.display = 'none';      
    }
    filterItems(inputValue, items) {
        items.forEach(item => {
            const itemText = normalizeString(item.textContent.toLowerCase());
            itemText.includes(inputValue) ? item.style.display = 'block' : item.style.display = 'none';
        });
    }
    showAllItems(items) {
        items.forEach(item => item.style.display = 'block');
    }
    createFilterDropdown(title, items, id) {
        const dropdownHTML = `
            <div class="dropdown_wrapper">
                <div class="dropdown"> 
                    <button class="dropdown_btn" type="button">
                        <span>${title}</span>
                        <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
                    </button>
    
                    <div class="dropdown_content">
                        <div>
                            <input tabindex="-1" type="text" id="search-${id}" maxlength="20">
                            <button tabindex="-1"></button>
                            <label for="search-${id}" aria-label="Search by ${title}"></label>
                        </div>
                        <ul class="dropdown_content_list">
                            ${items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>                          
            </div>
        `;

        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.innerHTML = dropdownHTML;

        const inputElement = dropdownWrapper.querySelector(`#search-${id}`);
        const itemList = dropdownWrapper.querySelector('.dropdown_content_list');

        this.search(inputElement, itemList);

        return dropdownWrapper;
    }
}