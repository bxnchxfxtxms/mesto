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
export const changeAvatarForm = document.forms.avatar;
export const avatarChanger = document.querySelector('.profile__avatar-overlay')
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addNewPlaceButton = document.querySelector('.profile__add-button');
export const username = editProfileForm.elements.username;
export const userBio = editProfileForm.elements.about;