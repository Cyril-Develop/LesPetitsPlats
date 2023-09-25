import { normalizeString } from '../utils/normalizeString.js';

export default class Dropdown {
    constructor(name, items) {
        this.name = name;
        this.items = items;
        this.itemList = null;
    }

    createDropdown() {
        const dropdownContent = `
            <div class="dropdown_wrapper">
                <div class="dropdown"> 
                    <button class="dropdown_btn" type="button">
                        <span>${this.name}</span>
                        <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
                    </button>

                    <div class="dropdown_content">
                        <div>
                            <input tabindex="-1" type="text" id="search-${this.name}" maxlength="20">
                            <button tabindex="-1"></button>
                            <label for="search-${this.name}" aria-label="Search by ${this.name}"></label>
                        </div>
                        <ul class="dropdown_content_list">
                            ${this.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>                          
            </div>
        `;
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.innerHTML = dropdownContent;

        const inputElement = dropdownWrapper.querySelector(`#search-${this.name}`);
        this.itemList = dropdownWrapper.querySelector('.dropdown_content_list');

        this.search(inputElement);

        return dropdownWrapper;
    }

    getItemsList() {
        return this.itemList.querySelectorAll('li');
    }

    updateItems(filteredRecipes, inputValue) {
        const filteredItems = []

        filteredRecipes.forEach(recipe => {
            filteredItems.push(normalizeString(recipe.appliance));

            recipe.ustensils.forEach(ustensil => filteredItems.push(normalizeString(ustensil)));

            recipe.ingredients.forEach(ingredient => filteredItems.push(normalizeString(ingredient.ingredient)));
        });

        const items = this.getItemsList();
        
        items.forEach(item => {
            const itemText = normalizeString(item.textContent.toLowerCase());
            if (!filteredItems.includes(itemText)) item.style.display = 'none';
            else item.style.display = 'block';
        });

        if (!inputValue) this.resetItemList();
    }

    resetItemList() {
        const items = this.getItemsList();
        items.forEach(item => item.style.display = 'block');
    }

    search(inputElement) {
        inputElement.addEventListener('input', () => {
            const inputValue = normalizeString(inputElement.value.toLowerCase());
            const items = this.getItemsList();
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

}