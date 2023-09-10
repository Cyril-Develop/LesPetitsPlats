export default class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
        console.log(recipe);
    }
    createCard() {
        const cardSection = document.querySelector('.card_section');
        const cardContent = `
            <article class="card" data-id=${this.recipe.id}>
                <img src="./images/recipes/${this.recipe.image}" alt="">
                <div class="card_infos">
                    <h2>${this.recipe.name}</h2>
                    <div class="card_infos_instructions">
                        <h3>Recette</h3>
                        <p>${this.recipe.description}</p>
                    </div>
                    <div class="card_infos_ingredients">
                        <h3>Ingrédients</h3>
                        <ul>
                            <li>
                                <span>lait coco</span>
                                <span>150ml</span>
                            </li>
                            <li>
                                <span>lait coco</span>
                                <span>150ml</span>
                            </li>
                            <li>
                                <span>lait coco</span>
                                <span>150ml</span>
                            </li>
                            <li>
                                <span>lait coco</span>
                                <span>150ml</span>
                            </li>
                            <li>
                                <span>lait coco</span>
                                <span>150ml</span>
                            </li>
                            <li>
                                <span>lait coco</span>
                                <span>150ml</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
        `;

        cardSection.innerHTML += cardContent;
    }
}