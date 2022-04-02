export const initialCards = [
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

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-error_active'
};

export const popupList = document.querySelectorAll('.popup');
export const editProfileForm = document.forms.profile;
export const addNewPlaceForm = document.forms.place;
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addNewPlaceButton = document.querySelector('.profile__add-button');
export const containerSelector = document.querySelector('.elements__grid');
export const username = editProfileForm.elements.username;
export const userBio = editProfileForm.elements.job;