import Popup from "./Popup.js"

export default class  PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._element = document.querySelector(this._popupSelector);
        this._popupForm = this._element.querySelector('.popup__form');
    }

    setHandleSubmit(activator) {
        this._handleSubmit = activator;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })

    }
};