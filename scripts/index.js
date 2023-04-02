import Card from "./card.js";
import FormValidator from "./FormValidator.js";

/* For opening */
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
/* For storage */
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description')
/* For changing */
const nameProvile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
/* For closing */
const closeButtonEdit = document.querySelector(".popup__close-button_close_edit");
/* For saving */
// Находим форму в DOM
const formElement = document.querySelector('.popup__form_data_profile');// Воспользуйтесь методом querySelector()

function openPopup(evt) {
    evt.classList.add('popup_opened');
    document.addEventListener('keyup', closeEsc);
};

function closePopup(evt) {
    evt.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeEsc);
};

//For increase
const increaseImg = document.querySelector('.popup_type_big-image');
const increaseImgLink = document.querySelector('.popup__photo');
const increaseImgText = document.querySelector('.popup__caption');

function openBigImage(text, link) {
    openPopup(increaseImg);
    increaseImgLink.src = link;
    increaseImgLink.alt = text;
    increaseImgText.textContent = text;
};

//To close
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});


// For adding
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardsContainer = document.querySelector('.photo-grid');
//const cardTemplate = document.querySelector('.element-template').content;

// function createCard(text, link) {
//     const card = cardTemplate.querySelector('.photo-grid__element').cloneNode(true);
//     const cardImg = card.querySelector('.photo-grid__photo');
//     const cardText = card.querySelector('.photo-grid__place');

//     cardText.textContent = text;
//     cardImg.src = link;
//     cardImg.alt = text;

//     // like
//     const like = card.querySelector('.photo-grid__like');
//     like.addEventListener('click', () => {
//         like.classList.toggle('photo-grid__like_on')
//     });
//     // delete
//     const deleteCard = card.querySelector('.photo-grid__delete');
//     deleteCard.addEventListener('click', () => {
//         card.remove();
//     });
//     // increase
//     const bigImg = card.querySelector('.photo-grid__photo');
//     bigImg.addEventListener('click', () => {
//         openBigImage(text, link);
//     });

//     return card;
// };

//work with Card class
function createCards(data) {
    const item = new Card(data.name, data.link, '.element-template', openBigImage);
    // Создаём карточку и возвращаем
    return item.createCard();
}

function insertCard(item) {
    const cardPlace = document.querySelector('.photo-grid');
    cardPlace.append(item);
}

function renderCards() {
    initialCards.forEach((element) => {
        //new instances of Card class
        const elementCard = createCards(element);
        //insert in html
        insertCard(elementCard);
    });
};

renderCards();

// For react on event
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-place');
const formImg = document.querySelector('.popup__form_data_card');

editButton.addEventListener('click', workOFpopup);

formElement.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', (event) => {
    openPopup(popupCard)
});
formImg.addEventListener('submit', handleImageSubmit);

//work with FormValidator class

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const validatorEditForm = new FormValidator(settings, editPopup);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(settings, popupCard);
validatorAddForm.enableValidation();

function workOFpopup() {
    openPopup(editPopup);
    nameInput.value = nameProvile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
};


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProvile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    closePopup(editPopup);
    evt.target.reset();
};

// Saving new card
const textImage = document.querySelector('.popup__input_type_place');
const linkImage = document.querySelector('.popup__input_type_link');

function handleImageSubmit(event) {
    event.preventDefault();
    const card = createCards({ name: textImage.value, link: linkImage.value });
    cardsContainer.prepend(card);
    closePopup(popupCard);
    event.target.reset();
};

// New types of closing
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(function (popup) {
    popup.addEventListener('click', function (event) {
        if (event.target === event.currentTarget) {
            closePopup(popup);
        }
    })
});

const closeEsc = (event) => {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};
