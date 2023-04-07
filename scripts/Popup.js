export default class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._element = document.querySelector(this._popupSelector);
        this._closeButton = this._element.querySelector('.popup__close-button');

    }

    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.closePopup();
        }
    }

    openPopup(){
        this._element.classList.add('popup_opened');
        document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    }

    closePopup(){
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
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