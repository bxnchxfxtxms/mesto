import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css'

import {
  initialCards,
  validationSettings,
  editProfileForm,
  addNewPlaceForm,
  profileEditButton,
  addNewPlaceButton,
  containerSelector,
  username,
  userBio
} from '../utils/constants.js'

const userInfo = new UserInfo({
  name: '.profile__username',
  bio: '.profile__user-bio'
})

const popupWithImage = new PopupWithImage('.popup_type_picture-zoom');
popupWithImage.setEventListeners();
     
const profileFormValidator = new FormValidator(validationSettings, editProfileForm);
const newPlaceFormValidator = new FormValidator(validationSettings, addNewPlaceForm);

function setCurrentUserData() {
  const userData = userInfo.getUserInfo();
  username.value = userData.name;
  userBio.value = userData.bio;
}

function createCard(data) {
  const card = new Card(
    data,
    '.element__template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link)
      }
    }
  )
  const cardElement = card.generateCard();
  return cardElement;
}

const cardContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    cardContainer.addItem(createCard(item));
    }
  }, containerSelector)

const addNewPlacePopup = new PopupWithForm({
  submitForm: (data) => {
    const newCardData = {
      name: data.field1,
      link: data.field2
    };
    cardContainer.addItem(createCard(newCardData));
    addNewPlacePopup.close();
  }
}, '.popup_type_add-place', 'place');

addNewPlacePopup.setEventListeners();

const editUserProfile = new PopupWithForm({
  submitForm: (data) => {
  const newUserInfo = {
    name: data.field1,
    bio: data.field2
  }
  userInfo.setUserInfo(newUserInfo)
  editUserProfile.close()
  }
}, '.popup_type_edit-profile', 'profile')

editUserProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  profileFormValidator.disableSubmitButton();
  profileFormValidator.resetValidation();
  setCurrentUserData();
  editUserProfile.open();
});

addNewPlaceButton.addEventListener('click', () => { 
  newPlaceFormValidator.disableSubmitButton();
  newPlaceFormValidator.resetValidation();
  addNewPlacePopup.open();
})

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
cardContainer.renderItems();