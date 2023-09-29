import { normalizeString } from '../utils/normalizeString.js';

export default class Dropdown {
    constructor(name, items) {
        this.name = name;
        this.items = items;
        this.filteredItems = [];
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
        this.itemList = dropdownWrapper.querySelectorAll('.dropdown_content_list li');

        inputElement.addEventListener('input', () => {
            this.search(normalizeString(inputElement.value));   
            this.toggleDeleteBtn(inputElement);
        });

        return dropdownWrapper;
    }

    updateItems(filteredItems, _inputValue, match) {
        this.filteredItems = filteredItems;

        // Avant de mettre à jour les éléments, masquez-les tous
        this.itemList.forEach(item => item.style.display = 'none');
            
        // Si match n'est pas null, affichez les éléments correspondants
        if (match) {
            match.forEach(itemText => {
                const itemElement = [...this.itemList].find(item => normalizeString(item.textContent) === normalizeString(itemText));
                if (itemElement) 
                    itemElement.style.display = 'block';
            });
        } else {
            // Si match est null, afficher tous les éléments de filteredItems
            this.filteredItems.forEach(itemText => {
                const itemElement = [...this.itemList].find(item => normalizeString(item.textContent) === normalizeString(itemText));
                if (itemElement) 
                    itemElement.style.display = 'block';
            });
        }
    }

    resetItemList() {
        this.itemList.forEach(item => item.style.display = 'block');
        this.filteredItems = [];
    }

    search(inputValue) {
        const itemsToSearch = !this.filteredItems.length ? this.items : this.filteredItems;

        const match = itemsToSearch.filter(item => {
            const normalizedItem = normalizeString(item);
            return normalizedItem.includes(inputValue);
        });

        this.updateItems(this.filteredItems, inputValue, match)
    }

    toggleDeleteBtn(inputElement) {
        const btnDelete = inputElement.nextElementSibling;
        const inputValue = inputElement.value;
        inputValue.length >= 3 ? btnDelete.style.display = 'block' : btnDelete.style.display = 'none';
    
        btnDelete.addEventListener('click', () => {
            inputElement.value = '';
            btnDelete.style.display = 'none';
    
            // Réinitialiser la liste des éléments affichés
            const itemsToReset = !this.filteredItems.length ? this.items : this.filteredItems;
            this.updateItems(itemsToReset, inputValue, null);
        });
    }
}