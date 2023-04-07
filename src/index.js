import Card from "./scripts/Сard.js";
import FormValidator from "./scripts/FormValidator.js";
import UserInfo from "./scripts/UserInfo.js";
import Section from "./scripts/Section.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";

import './pages/index.css';

import { initialCards, editButton, addButton, settings, popupCard, editPopup} from "./utilis/constants.js";


//work with FormValidator class

const validatorEditForm = new FormValidator(settings, editPopup);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(settings, popupCard);
validatorAddForm.enableValidation();

const userInfo = new UserInfo({
    name: ".profile__name",
    info: ".profile__description"
});

const startCard = new Section({
    items: initialCards,
    renderer: (item) => {
        startCard.addItem(createCard(item))
    }
}, '.photo-grid');
startCard.rendererAll();

function createCard(data) {
    const item = new Card(data.name, data.link, '.element-template', {
        handleCardClick: () => {
            const popupWithImage = new PopupWithImage('.popup_type_big-image');
            popupWithImage.openPopup(data.name, data.link)
        }
    });
    return item.createCard();
};

const editPopupWithForm = new PopupWithForm('.popup_type_edit', {
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
        editPopupWithForm.closePopup();
    }
});
editPopupWithForm.setEventListeners();
editButton.addEventListener('click', () => {
    editPopupWithForm.openPopup();
    editPopupWithForm.setUserData(userInfo.getUserInfo());
});

const addPopupWithForm = new PopupWithForm('.popup_type_new-place', {
    handleFormSubmit: (item) => {
        startCard.addItem(createCard(item));
        addPopupWithForm.closePopup();
    }
});
addButton.addEventListener('click', () => {
    addPopupWithForm.openPopup();
});
addPopupWithForm.setEventListeners();
