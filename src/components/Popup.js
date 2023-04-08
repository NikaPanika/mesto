export default class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._element = document.querySelector(this._popupSelector);
        this._closeButton = this._element.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.closePopup();
        }
    }

    openPopup(){
        this._element.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    closePopup(){
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners(){
        this._element.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
                this.closePopup();
            }
        })
        
        this._closeButton.addEventListener('click', (evt) => {
            this.closePopup()});
    }
}