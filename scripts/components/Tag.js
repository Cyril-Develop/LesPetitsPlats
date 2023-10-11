import { selectedTags } from "../pages/home.js";
import { recipes } from "../pages/home.js";
import { filterRecipesByTags } from "../utils/filterRecipesByTag.js";

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
        // Appelle la méthode removeTag sans parenthèse pour ne pas l'exécuter tout de suite mais seulement au clic
        tagBtn.forEach(btn => btn.addEventListener('click', this.removeTag));

        return tag;
    }
    removeTag(){
        const tag = this.closest('.tag');
        // Enlever les espaces autour du texte
        const tagName = tag.textContent.trim(); 
        selectedTags.splice(selectedTags.indexOf(tagName), 1);
        filterRecipesByTags(recipes, selectedTags);
        tag.remove();
    }
}