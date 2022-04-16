import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css'

import {
  avatarChanger,
  validationSettings,
  editProfileForm,
  addNewPlaceForm,
  changeAvatarForm,
  profileEditButton,
  addNewPlaceButton,
  username,
  userBio
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '3ab20797-6d1f-45f8-973c-0229900ec517',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  name: '.profile__username',
  about: '.profile__user-bio',
  avatar: '.profile__avatar'
})

Promise.all([api.getUserInfo(), api.getCards()])
.then(res => {
  const serverData = {userData: res[0], cards: res[1]}
  return serverData
})
.then(data => {
  const currentUserData = {
    name: data.userData.name,
    about: data.userData.about,
    id: data.userData._id,
    avatar: data.userData.avatar
  }
  userInfo.setUserInfo(currentUserData)
  cardContainer.renderItems(data.cards)
})
.catch(err => {
  console.log(err)
})

const cardDeleteConfirmationPopup = new PopupWithForm({
  submitHandler: (cardId) => {
    api.deleteCard(cardId)
  }
}, '.popup_type_card-delete-confirm');

cardDeleteConfirmationPopup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_picture-zoom');
popupWithImage.setEventListeners();
     
const profileFormValidator = new FormValidator(validationSettings, editProfileForm);
const newPlaceFormValidator = new FormValidator(validationSettings, addNewPlaceForm);
const changeAvatarFormValidator = new FormValidator(validationSettings, changeAvatarForm)

function fillFormWithCurrentUserData() {
  const userData = userInfo.getUserInfo();
  username.value = userData.name;
  userBio.value = userData.about;
}

function createCard(data) {
  const card = new Card(
    data,
    '.element__template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link)
      },
      handleCardDelete: (id) => {
        cardDeleteConfirmationPopup.open()
        cardDeleteConfirmationPopup.changeSubmitHandler(() => {
          api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            cardDeleteConfirmationPopup.close()
          })
        })
      },
      handleLikeButtonClick: (cardId, state) => {
        if (!state) {
        api.setLike(cardId)
        .then(data => {
          card.setLikes(data)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
          api.removeLike(cardId)
          .then(data => {
            card.setLikes(data)
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
    },
    api.getUserInfo()
  )
  const cardElement = card.generateCard();
  return cardElement;
}

const cardContainer = new Section({
  renderer: (item) => {
    cardContainer.addItem(createCard(item));
    }
  }, '.elements__grid')

const addNewPlacePopup = new PopupWithForm({
  submitHandler: (data) => {
    addNewPlacePopup.renderLoading(true)
    const newCardData = {
      name: data.name,
      link: data.link
    };
    api.postNewCard(newCardData)
    .then(newCardReturnedData => {
      cardContainer.addItem(createCard(newCardReturnedData))
      addNewPlacePopup.close();
    })
    .finally(() => {
      addNewPlacePopup.renderLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  }
}, '.popup_type_add-place');

addNewPlacePopup.setEventListeners();

const editUserProfile = new PopupWithForm({
  submitHandler: (data) => {
  editUserProfile.renderLoading(true)
  const newUserInfo = {
    name: data.username,
    about: data.about
  }
  api.editUserInfo(newUserInfo)
  .then((data) => {
    userInfo.setUserInfo(data)
    editUserProfile.close()
  })
  .finally(() => {
    editUserProfile.renderLoading(false)
  })
  .catch(err => {
    console.log(err)
  })
  }
}, '.popup_type_edit-profile')

editUserProfile.setEventListeners();

const changeAvatarPopup = new PopupWithForm({
  submitHandler: (link) => {
    changeAvatarPopup.renderLoading(true)
    api.changeAvatar(link)
    .then((data) => {
      userInfo.setUserInfo(data)
      changeAvatarPopup.close()
    })
    .finally(() => {
      changeAvatarPopup.renderLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }
}, '.popup_type_change-avatar');

changeAvatarPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  fillFormWithCurrentUserData();
  editUserProfile.open();
});

addNewPlaceButton.addEventListener('click', () => { 
  newPlaceFormValidator.resetValidation();
  addNewPlacePopup.open();
})

avatarChanger.addEventListener('click', () => {
  changeAvatarFormValidator.resetValidation();
  changeAvatarPopup.open()
})

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();