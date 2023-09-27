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

        inputElement.addEventListener('input', () => this.search(inputElement.value.toLowerCase()));

        return dropdownWrapper;
    }

    updateItems(filteredItems, inputValue) {
        this.filteredItems = filteredItems;
        this.itemList.forEach(item => {
            const itemText = normalizeString(item.textContent.toLowerCase());
            filteredItems.includes(itemText) ? item.style.display = 'block' : item.style.display = 'none';
        });

        if (!inputValue) {
            this.resetItemList();
        }
    }

    resetItemList() {
        this.itemList.forEach(item => item.style.display = 'block');
    }

    search(inputValue) {
        const itemsToSearch = !this.filteredItems.length ? this.items : this.filteredItems;
    
        const filteredItems = itemsToSearch.filter(item => {
            const normalizedItem = normalizeString(item.toLowerCase());
            return normalizedItem.includes(inputValue);
        });
    
        this.updateItems(filteredItems, inputValue)
    } 
}