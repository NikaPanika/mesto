export default class FormValidator {
  constructor(settings, editPopup) {
    this._editPopup = editPopup;
    this._inputErrorClass = settings.inputErrorClass;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formSelector = settings.formSelector;
    this._inputList = Array.from(this._editPopup.querySelectorAll(this._inputSelector));
    this._submitButton = this._editPopup.querySelector(this._submitButtonSelector);
  }

  //показать ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._editPopup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);//red line
    errorElement.textContent = errorMessage;
  };
  //скрыть ошибку
  _hideInputError(inputElement) {
    const errorElement = this._editPopup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._editPopup.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
      setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
        this._toggleButtonState(), 0
      })
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  };

  enableValidation() {
    const formList = Array.from(document.querySelector(this._formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  };

}
