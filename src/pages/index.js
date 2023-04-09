import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

import '../pages/index.css';

import { initialCards, editButton, addButton, settings, popupCard, editPopup } from "../utilis/constants.js";

//work with FormValidator class

const validatorEditForm = new FormValidator(settings, editPopup);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(settings, popupCard);
validatorAddForm.enableValidation();

const userInfo = new UserInfo({
    name: ".profile__name",
    about: ".profile__description"
});

const startCard = new Section({
    renderer: (page, item) => {
        page.prepend(item);
    }
}, '.photo-grid');
//work with API
const api = new Api({
    url: "nomoreparties.co/v1/cohort-62",
    headers: {
        'Content-Type': 'application/json',
        authorization: '60c75962-687d-4370-aac5-e6c62578576c'
    }
})


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
        api.editProfile(item)
            .then(res => {
                userInfo.setUserInfo(res.name, res.about, res.avatar);
                editPopupWithForm.closePopup();
            }).catch(err => console.log(`Ошибка edit: ${err}`))
            .finally(() => {
                editPopupWithForm.stopLoading();
            });

    }
});

editPopupWithForm.setEventListeners();
editButton.addEventListener('click', () => {
    editPopupWithForm.openPopup();
    editPopupWithForm.setUserData(userInfo.getUserInfo());
});
api.getInitialCards()
    .then((cards) => {
        cards.forEach(card => {
            startCard.addItem(createCard(card));
        })
    })
    .catch((err) => {
        console.log(`Ошибка card: ${err}`)
    });

const addPopupWithForm = new PopupWithForm('.popup_type_new-place', {
    handleFormSubmit: (item) => {
        api.addCard(item)
            .then(res => {
                console.log(res);
                startCard.addItem(createCard(res));
                addPopupWithForm.closePopup();
            })
            .catch(err =>
                console.log(`Ошибка edit: ${err}`));

    }
});
addButton.addEventListener('click', () => {
    addPopupWithForm.openPopup();
});
addPopupWithForm.setEventListeners();


api.getUser()
    .then(data => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => {
        console.log(`Error: ${err}`)
    });
