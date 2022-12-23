/* For opening */
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
/* For storage */
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description')
/* For changing */
const nameProvile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
/* For closing */
const closeButton = document.querySelector(".popup__close-button");
/* For saving */
// Находим форму в DOM
const formElement = document.querySelector('.popup');// Воспользуйтесь методом querySelector()

function workOFpopup(){
    editPopup.classList.add('popup_opened');
    nameInput.value = nameProvile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
}

function closePopup(){
    editPopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    nameProvile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    closePopup();
}

editButton.addEventListener('click', workOFpopup);

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);