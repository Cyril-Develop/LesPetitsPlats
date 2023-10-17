import { selectedTags } from "../pages/home.js";
import { allRecipes } from "../pages/home.js";
import { filterRecipes } from "../utils/filterRecipes.js";

export default class Tag {
    constructor(name) {
        this.name = name;
    }
    createTag() {
        const tagSection = document.querySelector('.tag_section');
        const tag = `
            <div class="tag">
                <h3>${this.name}</h3>
                <button></button>
            </div>
        `;
        tagSection.innerHTML += tag;

        const tagBtn = tagSection.querySelectorAll('button');
        tagBtn.forEach(btn => btn.addEventListener('click', this.removeTag));

        return tag;
    }
    removeTag(){
        const inputValue = document.querySelector('#search-recipe').value;
        const tag = this.closest('.tag');
        // Enlever les espaces autour du texte
        const tagName = tag.textContent.trim(); 
        selectedTags.splice(selectedTags.indexOf(tagName), 1);
        filterRecipes(allRecipes, selectedTags, inputValue);
        tag.remove();
    }
}