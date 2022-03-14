import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-error_active'
};

const popupList = document.querySelectorAll('.popup');
const popupInputFieldList = document.querySelectorAll('.popup__input-field');
const popupErrorMessageList = document.querySelectorAll('.popup__input-error');
const editProfileForm = document.forms.profile;
const addNewPlaceForm = document.forms.place;
const nameInput = editProfileForm.elements.username;
const jobInput = editProfileForm.elements.job;
const placeTitleInput = addNewPlaceForm.elements.place;
const placeLinkInput = addNewPlaceForm.elements.picture;
const pictureZoom = document.querySelector('.popup_type_picture-zoom');
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewPlaceButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_edit-profile');
const elementsList = document.querySelector('.elements__grid');
const userName = document.querySelector('.profile__username');
const userJob = document.querySelector('.profile__user-bio');
const addPlace = document.querySelector('.popup_type_add-place');
const popupImage = pictureZoom.querySelector('.popup__image');
const popupImageCaption = pictureZoom.querySelector('.popup__image-caption');

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
const addNewPlaceFormValidator = new FormValidator(validationSettings, addNewPlaceForm);


const initialCards = [
  {
    name: 'Национальный парк Секвойя',
    link: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
  },
  {
    name: 'Гора Эверест',
    link: 'https://images.unsplash.com/photo-1594725224909-0e66d59ed0f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Остров Ольхон',
    link: 'https://images.unsplash.com/photo-1552588353-5682e06233fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80'
  },
  {
    name: 'Красноярск',
    link: 'https://images.unsplash.com/photo-1611312048774-dd46e5d576ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80'
  },
  {
    name: 'Тверь',
    link: 'https://images.unsplash.com/photo-1641297136561-17697bdb017b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  }
];

const enableExitPopupWithEscapeButton = ((event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closePopup();
  }
})

function handlePopupExitByMouseClick (event) {
  if ((event.target.classList.contains('popup')) || (event.target.classList.contains('popup__close-button'))) {
    closePopup();
  }
}

function closePopup() {
  window.removeEventListener('click', handlePopupExitByMouseClick);
  window.removeEventListener('keydown', enableExitPopupWithEscapeButton);
  popupList.forEach((popup) => {
    popup.classList.remove('popup_opened');
  })
}

function clearInputErrors() {
  popupInputFieldList.forEach((field) => {
    field.classList.remove('popup__input-field_type_error');
  })
  popupErrorMessageList.forEach((message) => {
    message.classList.remove('popup__input-error_active');
  })
}

function openPopup(popupElement) {
  window.addEventListener('click', handlePopupExitByMouseClick);
  window.addEventListener('keydown', enableExitPopupWithEscapeButton);
  popupElement.classList.add('popup_opened');
};

function openAddNewPlacePopup() {
  addNewPlaceFormValidator.disableSubmitButton();
  clearInputErrors();
  addNewPlaceForm.reset();
  openPopup(addPlace);
}

function renderCard(data) {
  const newCard = new Card(data, '.element__template', openPictureZoomPopup);
  const renderedCard = newCard.generateCard();
  elementsList.prepend(renderedCard);
}

function renderInitialCards() {
  initialCards.forEach(renderCard);
} 

renderInitialCards();

function handleAddNewCard(event) {
  event.preventDefault();
  const newCard = {};
  newCard.name = placeTitleInput.value;
  newCard.link = placeLinkInput.value;
  renderCard(newCard);
  closePopup(event);
  addNewPlaceForm.reset();
}

function openPictureZoomPopup() {
  popupImage.src = this._link;
  popupImageCaption.textContent = this._name;
  popupImage.alt = popupImageCaption.textContent;
  openPopup(pictureZoom);
}

function openProfileEditPopup() {
  editProfileFormValidator.disableSubmitButton();
  clearInputErrors();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(editProfile);
};

function handleEditProfile(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(event);
};

editProfileForm.addEventListener('submit', handleEditProfile);
addNewPlaceForm.addEventListener('submit', handleAddNewCard);
profileEditButton.addEventListener('click', openProfileEditPopup);
addNewPlaceButton.addEventListener('click', openAddNewPlacePopup);
editProfileFormValidator.enableValidation();
addNewPlaceFormValidator.enableValidation();