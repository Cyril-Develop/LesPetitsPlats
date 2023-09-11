export default class Filter {
    constructor(data) {
        this.recipes = data.recipes;
        this.ingredients = new Set();
        this.appliances = new Set();
        this.ustensils = new Set();
    }
    extractUniqueProperties() {
        this.recipes.forEach(recipe => {
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
    
        // Convertissez les ensembles (Sets) en tableaux
        const ingredientsArray = Array.from(this.ingredients);
        const appliancesArray = Array.from(this.appliances);
        const ustensilsArray = Array.from(this.ustensils);
    
        // Récupérez la section de filtre
        const filterSection = document.querySelector('.filter_section');
    
        // Générez le contenu HTML pour chaque tableau
        const ingredientsDropdown = this.createFilterDropdown('Ingrédients', ingredientsArray, 'ingredients');
        const appliancesDropdown = this.createFilterDropdown('Appareils', appliancesArray, 'appliances');
        const ustensilsDropdown = this.createFilterDropdown('Ustensiles', ustensilsArray, 'ustensils');
    
        // Ajoutez les boutons déroulants à la section de filtre
        filterSection.appendChild(ingredientsDropdown);
        filterSection.appendChild(appliancesDropdown);
        filterSection.appendChild(ustensilsDropdown);
    }
    
    createFilterDropdown(title, items, id) {
        // Utilisation de balises de modèle pour générer le contenu HTML
        const dropdownHTML = `
            <div class="dropdown_wrapper">
                <div class="dropdown"> 
                    <button class="dropdown_btn" type="button">
                        <span>${title}</span>
                        <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
                    </button>
    
                    <div class="dropdown_content">
                        <div>
                            <input tabindex="-1" type="text" id="search-${id}" maxlength="10">
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
    
        // Créez un élément div pour contenir le contenu HTML généré
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.innerHTML = dropdownHTML;
    
        // Retournez le contenu HTML
        return dropdownWrapper;
    }
    
}