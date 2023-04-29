import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._element = document.querySelector(this._popupSelector);
        this._submitForm = handleFormSubmit;
        this._popupForm = this._element.querySelector('.popup__form');
        this._inputList = this._element.querySelectorAll('.popup__input');

        this._submitButton = this._element.querySelector(".popup__save-button");
        this._textSubmitButton = this._submitButton.textContent;
        this._textSubmitButtonActive = "Сохранение...";


    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((item) => {
            this._inputValues[item.name] = item.value;
        });

        return this._inputValues;

    }

    setUserData(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.startLoading();
            this._submitForm(this._getInputValues());
            //this.closePopup();
        })

    }

    closePopup() {
        setTimeout(() => {super.closePopup()}, 300);
        this._popupForm.reset();
    }

    startLoading() {
        this._submitButton.disabled = true;
        this._submitButton.textContent = this._textSubmitButtonActive;
    }

    stopLoading() {
        this._submitButton.disabled = false;
        this._submitButton.textContent = this._textSubmitButton;
    }
}