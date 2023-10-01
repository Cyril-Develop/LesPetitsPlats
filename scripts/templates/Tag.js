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

        return tag;
    }
}