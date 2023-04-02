import Card from "./Сard.js";
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
// For inserting
const cardPlace = document.querySelector('.photo-grid');
// Находим форму в DOM
const profileForm = document.querySelector('.popup__form_data_profile');// Воспользуйтесь методом querySelector()

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

//work with Card class
function createCard(data) {
    const item = new Card(data.name, data.link, '.element-template', openBigImage);
    // Создаём карточку и возвращаем
    return item.createCard();
}

function insertCard(item) {
    cardPlace.append(item);
}

function renderCards() {
    initialCards.forEach((element) => {
        //new instances of Card class
        const elementCard = createCard(element);
        //insert in html
        insertCard(elementCard);
    });
};

renderCards();

// For react on event
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-place');
const formImg = document.querySelector('.popup__form_data_card');

editButton.addEventListener('click', openProfilePopup);

profileForm.addEventListener('submit', handleProfileFormSubmit);

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

function openProfilePopup() {
    openPopup(editPopup);
    nameInput.value = nameProvile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
};


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
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
    const card = createCard({ name: textImage.value, link: linkImage.value });
    cardsContainer.prepend(card);
    closePopup(popupCard);
    event.target.reset();
};

// New types of closing
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(function (popup) {
    popup.addEventListener('mousedown', function (event) {
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
