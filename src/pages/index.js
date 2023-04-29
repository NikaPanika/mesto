import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import '../pages/index.css';

import { avatarButton, editButton, addButton, settings, popupCard, editPopup, avatarPopup } from "../utilis/constants.js";

//work with FormValidator class

const validatorEditForm = new FormValidator(settings, editPopup);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(settings, popupCard);
validatorAddForm.enableValidation();

const validatorAvatarForm = new FormValidator(settings, avatarPopup);
validatorAvatarForm.enableValidation();

const userInfo = new UserInfo({
    name: ".profile__name",
    about: ".profile__description",
    avatar: ".profile__avatar"
});

const startCard = new Section({
    renderer: (page, item) => {
        page.prepend(item);
    }
}, '.photo-grid');
//work with API
const api = new Api({
    url: "nomoreparties.co/v1/cohort-64",
    headers: {
        'Content-Type': 'application/json',
        authorization: 'b3214215-bdfc-4688-a4e7-22854e57a120'
    }
})

Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
        cards.reverse().forEach(card => {
            startCard.addItem(createCard(card));
        });

    })
    .catch((err) => {
        console.log(`Ошибка card and userInfo: ${err}`)
    });

const deletePopup = new PopupWithConfirmation('.popup-delete');
deletePopup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_big-image');
popupWithImage.setEventListeners();

function createCard(data) {
    const item = new Card(data.name, data.link, data.likes, data.owner._id, userInfo.getMyId(), data._id, '.element-template', {
        handleCardClick: () => {
            popupWithImage.openPopup(data.name, data.link);
        },
    },
        {
            handleTrashcanClick: (id) => {
                deletePopup.setHandleSubmit(() => {
                    api.deleteCard(id)
                        .then(() => {

                            item.deleteCard();
                            deletePopup.closePopup();
                        })
                        .catch((err) => console.log(`Ошибка delete: ${err}`));
                });
                deletePopup.openPopup();

            }
        }, {
        handleLikeClick: (id) => {
            //console.log(item.isLiked());
            if (item.isLiked()) {
                api
                    .deletePhotoLike(id)
                    .then((res) => {
                        item.showLikes(res.likes)
                    })
                    .catch((err) => console.log(`Ошибка like: ${err}`));
            } else {
                api
                    .addPhotoLike(id)
                    .then((res) => {
                        item.showLikes(res.likes);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            }
        }
    });

    return item.createCard();
};



const editPopupWithForm = new PopupWithForm('.popup_type_edit', {
    handleFormSubmit: (item) => {
        api.editProfile(item)
            .then(res => {
                userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
                editPopupWithForm.closePopup();
            })
            .catch(err => console.log(`Ошибка edit: ${err}`))
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


const addPopupWithForm = new PopupWithForm('.popup_type_new-place', {
    handleFormSubmit: (item) => {
        api.addCard(item)
            .then(res => {
                startCard.addItem(createCard(res));
                addPopupWithForm.closePopup();
            })
            .catch(err =>
                console.log(`Ошибка edit: ${err}`))
            .finally(() => {
                addPopupWithForm.stopLoading();
            });

    }
});
addButton.addEventListener('click', () => {
    addPopupWithForm.openPopup();
});
addPopupWithForm.setEventListeners();

const addPopupAvatar = new PopupWithForm('.popup-avatar', {
    handleFormSubmit: (item) => {
        api.setAvatar(item)
            .then(res => {
                userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
                addPopupAvatar.closePopup();
            })
            .catch(err =>
                console.log(`Ошибка avatar: ${err}`))
            .finally(() => {
                addPopupAvatar.stopLoading();
            });

    }
});

avatarButton.addEventListener('click', () => {
    addPopupAvatar.openPopup();
});
addPopupAvatar.setEventListeners();