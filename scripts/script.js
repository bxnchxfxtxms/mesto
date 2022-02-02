const pictureZoom = document.querySelector('.popup_type_picture-zoom');
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewPlaceButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_edit-profile');
const elementsList = document.querySelector('.elements__grid')
const elementTemplate = document.querySelector('.element__template').content;
const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
const addNewPlaceForm = document.querySelector('.popup__form_type_add-place');
const nameInput = editProfileForm.querySelector('.popup__input-field_input-type_username');
const jobInput = editProfileForm.querySelector('.popup__input-field_input-type_user-bio');
const placeTitleInput = addNewPlaceForm.querySelector('.popup__input-field_input-type_place');
const placeLinkInput = addNewPlaceForm.querySelector('.popup__input-field_input-type_picture-link');
const userName = document.querySelector('.profile__username');
const userBio = document.querySelector('.profile__user-bio');
const addPlace = document.querySelector('.popup_type_add-place');
const closePopupButton = document.querySelectorAll('.popup__close-button');
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

closePopupButton.forEach(item => {
  item.addEventListener('click', closePopup)
});

function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
};

function toggleLike(event) {
  event.target.classList.toggle('element__like-button_active');
}

function deleteElement(event) {
  event.target.parentElement.remove();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

function clearInputFields() {
  placeTitleInput.value = '';
  placeLinkInput.value = '';
}

function openAddNewPlacePopup() {
  openPopup(addPlace);
}

function addCardEventListeners(element) {
  element.querySelector('.element__like-button').addEventListener('click', toggleLike);
  element.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  element.querySelector('.element__image').addEventListener('click', openPictureZoomPopup);
}

function createEmptyCard(cardData) {
  const emptyCard = elementTemplate.cloneNode(true);
  emptyCard.querySelector('.element__image').src = cardData.link;
  emptyCard.querySelector('.element__title').textContent = cardData.name;
  addCardEventListeners(emptyCard);
  return emptyCard;
}

function writeCardContent(content) {
  const cardWithContent = createEmptyCard(content);
  return cardWithContent;
}

function renderCard(card) {
  const renderedCard = writeCardContent(card);
  elementsList.prepend(renderedCard);
}

initialCards.forEach(item => {
  renderCard(item);
})

function handleAddNewCard(event) {
  event.preventDefault();
  const newCard = {};
  newCard.name = placeTitleInput.value;
  newCard.link = placeLinkInput.value;
  renderCard(newCard);
  closePopup(event);
  clearInputFields();
}

function openPictureZoomPopup(event) {
  popupImage.src = event.target.src;
  popupImageCaption.textContent = event.target.parentElement.textContent;
  openPopup(pictureZoom);
}

function openProfileEditPopup() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
  openPopup(editProfile);
};

function handleEditProfile(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = jobInput.value;
  closePopup(event);
};

editProfileForm.addEventListener('submit', handleEditProfile);
addNewPlaceForm.addEventListener('submit', handleAddNewCard);
profileEditButton.addEventListener('click', openProfileEditPopup);
addNewPlaceButton.addEventListener('click', openAddNewPlacePopup);