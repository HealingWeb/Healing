class ColorCardManager {
    constructor() {
        this.colors = ['#FF6347', '#FFD700', '#7FFF00'];
        this.showColorCardsButton = document.querySelector('#show-color-cards-button');
        this.colorCardsContainer = document.querySelector('.color-cards-container');

        this.showColorCardsButton.addEventListener('click', this.toggleColorCards.bind(this));
    }

    toggleColorCards() {
        this.colorCardsContainer.classList.toggle('show');
    }

    renderColorCards() {
        this.colors.forEach(color => {
            const card = document.createElement('div');
            card.classList.add('color-card');
            card.style.backgroundColor = color;
            card.textContent = color;
            this.colorCardsContainer.appendChild(card);
        });
    }
}

const colorCardManager = new ColorCardManager();
colorCardManager.renderColorCards();
