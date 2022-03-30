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
} from '../utils/constants.js'

const userInfo = new UserInfo({
  name: '.profile__username',
  bio: '.profile__user-bio'
})
const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
const addNewPlaceFormValidator = new FormValidator(validationSettings, addNewPlaceForm);

const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      '.element__template',
      {
        handleCardClick: (name, link) => {
          const popupWithImage = new PopupWithImage('.popup_type_picture-zoom');
          popupWithImage.setEventListeners();
          popupWithImage.open(name, link)
        }
      });
      const cardElement = card.generateCard();
      initialCardsList.addItem(cardElement)
    }
  }, containerSelector)

const addNewPlacePopup = new PopupWithForm({
  submitForm: (data) => {
    const newCardData = [{
      name: data.field1,
      link: data.field2
    }];
    const newElement = new Section({
      items: newCardData,
      renderer: (item) => {
        const card = new Card(
          item,
          '.element__template',
          {
            handleCardClick: (name, link) => {
              const popupWithImage = new PopupWithImage('.popup_type_picture-zoom');
              popupWithImage.setEventListeners();
              popupWithImage.open(name, link)
            }
          });
          const cardElement = card.generateCard();
          newElement.addItem(cardElement)
        }
      }, containerSelector)
    newElement.renderItems();
    addNewPlacePopup.close();
  }
}, '.popup_type_add-place', 'place');

const editUserProfile = new PopupWithForm({
  submitForm: (data) => {
  userInfo.setUserInfo(data)
  editUserProfile.close()
  }
}, '.popup_type_edit-profile', 'profile')

profileEditButton.addEventListener('click', () => {
  editUserProfile.setEventListeners();
  editProfileFormValidator.disableSubmitButton();
  editProfileFormValidator.resetValidation();
  userInfo.getUserInfo('profile')
  editUserProfile.open()
});

addNewPlaceButton.addEventListener('click', () => { 
  addNewPlacePopup.setEventListeners();
  addNewPlaceFormValidator.disableSubmitButton();
  addNewPlaceFormValidator.resetValidation();
  addNewPlacePopup.open();
})

editProfileFormValidator.enableValidation();
addNewPlaceFormValidator.enableValidation();
initialCardsList.renderItems();