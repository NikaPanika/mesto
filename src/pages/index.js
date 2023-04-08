import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import '../pages/index.css';

import { initialCards, editButton, addButton, settings, popupCard, editPopup} from "../utilis/constants.js";


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

const popupWithImage = new PopupWithImage('.popup_type_big-image');
popupWithImage.setEventListeners();  

function createCard(data) {
    const item = new Card(data.name, data.link, '.element-template', {
        handleCardClick: () => {
            popupWithImage.openPopup(data.name, data.link);
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
