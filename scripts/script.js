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
const elementsList = document.querySelector('.elements__grid')
const elementTemplate = document.querySelector('.element__template').content;
const userName = document.querySelector('.profile__username');
const userJob = document.querySelector('.profile__user-bio');
const addPlace = document.querySelector('.popup_type_add-place');
const popupImage = pictureZoom.querySelector('.popup__image');
const popupImageCaption = pictureZoom.querySelector('.popup__image-caption');

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
  window.removeEventListener('keydown', enableExitPopupWithEscapeButton)
  popupList.forEach((popup) => {
    popup.classList.remove('popup_opened')
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

function toggleLike(event) {
  event.target.classList.toggle('element__like-button_active');
}

function deleteElement(event) {
  event.target.parentElement.remove();
}

function openPopup(popupElement) {
  window.addEventListener('click', handlePopupExitByMouseClick);
  window.addEventListener('keydown', enableExitPopupWithEscapeButton);
  popupElement.classList.add('popup_opened');
};

function openAddNewPlacePopup() {
  disableSubmitButton(addNewPlaceForm.elements.create, 'popup__submit-button_disabled')
  clearInputErrors();
  addNewPlaceForm.reset();
  openPopup(addPlace);
}

function addCardEventListeners(element) {
  element.querySelector('.element__like-button').addEventListener('click', toggleLike);
  element.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  element.querySelector('.element__image').addEventListener('click', openPictureZoomPopup);
}

function createNewCard(cardData) {
  const newCard = elementTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.element__image');
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCard.querySelector('.element__title').textContent = cardData.name;
  addCardEventListeners(newCard);
  return newCard;
}

function renderCard(card) {
  const renderedCard = createNewCard(card);
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

function openPictureZoomPopup(event) {
  popupImage.src = event.target.src;
  popupImageCaption.textContent = event.target.closest('.element').textContent;
  popupImage.alt = popupImageCaption.textContent;
  openPopup(pictureZoom);
}

function openProfileEditPopup() {
  disableSubmitButton(editProfileForm.elements.save, 'popup__submit-button_disabled')
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