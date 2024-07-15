class ColorCardManager {
    constructor() {
        this.colors = ['#FF6347', '#FFD700', '#7FFF00', '#00BFFF', '#9400D3', '#FF4500', '#4682B4', '#8A2BE2', '#00FF7F', '#F08080'];
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
