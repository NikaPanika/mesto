export default class Card {

    constructor(name, link, like, userId, myId, cardId, templateSelector, { handleCardClick }, { handleTrashcanClick }, { handleLikeClick }) {
        this._name = name;
        this._link = link;
        this._like = like;
        this._cardId = cardId;
        this._myId = myId;
        this._userId = userId;
        //this._counter = counter;
        this._templateSelector = templateSelector;
        this._handleTrashcanClick = handleTrashcanClick;
        this._openBigImage = handleCardClick;
        this._handleLikeClick = handleLikeClick;

    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__element').cloneNode(true);
        return card;
    }

    isLiked() {
        return this._like.some((user) => user._id === this._myId);
    }

    _paintLikeButton() {
        this._buttonLike.classList.add('photo-grid__like_on');
    }

    showLikes(newLikes) {
        this._like = newLikes;
        this._getLike();
        if (this.isLiked()) {
            this._paintLikeButton()
        } else {
            this._cleanLikeButton();
        }
    }

    _cleanLikeButton() {
        this._buttonLike.classList.remove('photo-grid__like_on');
    }


    _getLike() {
        this._likesCounter.textContent = this._like.length;
    }

    _deleteRemoveButton() {
        if (this._myId !== this._userId) {
            this._deleteButton.remove();
        }
    }

    deleteCard() {
        this._element.remove();
    }


    _increaseCard() {
        this._openBigImage(this._name, this._link);
    }
    _addEventListeners() {
        // like
        this._buttonLike.addEventListener('click', () => {
            this._handleLikeClick(this._cardId);
        })
        // delete
        this._deleteButton.addEventListener('click', () => this._handleTrashcanClick(this._cardId));
        // increase
        this._cardImage.addEventListener('click', () => this._increaseCard());
    }

    createCard() {
        this._element = this._getTemplate();
        this._likesCounter = this._element.querySelector('.photo-grid__like-counter');
        this._deleteButton = this._element.querySelector('.photo-grid__delete');
        this._buttonLike = this._element.querySelector('.photo-grid__like');
        // Add data in template
        this._cardImage = this._element.querySelector('.photo-grid__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardText = this._element.querySelector('.photo-grid__place');
        this._cardText.textContent = this._name;
        this.showLikes(this._like);
        this._deleteRemoveButton();
        this._addEventListeners();

        return this._element;
    }

    _handleImageClick() {
        this._handleCardClick(this._name, this._link);
    }
};