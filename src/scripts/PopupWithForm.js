import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._element = document.querySelector(this._popupSelector);
        this._submitForm = handleFormSubmit;
        this._popupForm = this._element.querySelector('.popup__form');
        this._inputList = this._element.querySelectorAll('.popup__input');
        
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
            this._submitForm(this._getInputValues());
            this._popupForm.reset();
            this.closePopup();
        })

    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }
}