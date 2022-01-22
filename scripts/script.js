let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__username');
let userBio = document.querySelector('.profile__user-bio');
let formElement = document.querySelector('.popup__edit-profile');
let nameInput = document.querySelector('.popup__input-field_input-type_username');
let jobInput = document.querySelector('.popup__input-field_input-type_user-bio');
let saveButton = document.querySelector('.popup__save-button');

function openPopup() {
  popup.classList.add('popup_opened_true');
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened_true');
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

function saveBtnClicked() {
  popup.classList.remove('popup_opened_true');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);