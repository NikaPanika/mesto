export default class Card {

    constructor(name, link, templateSelector, openBigImage) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._openBigImage = openBigImage;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__element').cloneNode(true);
        return card;
    }

    _likeCard(evt) {
        evt.target.classList.toggle('photo-grid__like_on');
    }

    _deleteCard() {
        this._element.remove();
    }

    _increaseCard() {
        this._openBigImage(this._name, this._link);
    }
    _addEventListeners() {
        // like
        this._element.querySelector('.photo-grid__like').addEventListener('click', (evt) => this._likeCard(evt));
        // delete
        this._element.querySelector('.photo-grid__delete').addEventListener('click', () => this._deleteCard());
        // increase
        this._cardImage.addEventListener('click', () => this._increaseCard());
    }

    createCard() {
        this._element = this._getTemplate();
        // Add data in template
        this._cardImage = this._element.querySelector('.photo-grid__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardText = this._element.querySelector('.photo-grid__place');
        this._cardText.textContent = this._name;

        this._addEventListeners();

        return this._element;
    }
};