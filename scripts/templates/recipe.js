export default class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }
    createCard() {
        const cardSection = document.querySelector('.card_section');
        const cardContent = `
            <article class="card" data-id=${this.recipe.id}>
                <img src="./images/recipes/${this.recipe.image}" alt="${this.recipe.name}">
                <div class="card_infos">
                    <h2>${this.recipe.name}</h2>
                    <div class="card_infos_instructions">
                        <h3>Recette</h3>
                        <p>${this.recipe.description}</p>
                    </div>
                    <div class="card_infos_ingredients">
                        <h3>Ingrédients</h3>
                        <ul>
                            ${this.recipe.ingredients.map(ingredient => {
                                if (ingredient.quantity && ingredient.unit) {
                                    return `
                                        <li>
                                            <span>${ingredient.ingredient}</span>
                                            <span>${ingredient.quantity} ${ingredient.unit}</span>
                                        </li>
                                            `;
                                } else {
                                    return `
                                        <li>
                                            <span>${ingredient.ingredient}</span>
                                        </li>
                                            `;
                                }
                            }).join('')} 
                        </ul>
                    </div>
                </div>
            </article>
        </section>
        `;

        cardSection.innerHTML += cardContent;
    }
}