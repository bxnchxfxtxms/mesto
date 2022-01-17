let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.popup_opened_true');
let popupCloseButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__username');
let userBio = document.querySelector('.profile__user-bio');
let formElement = document.querySelector('.popup__edit-profile');
let nameInput = document.querySelector('.popup__name-edit');
let jobInput = document.querySelector('.popup__bio-edit');
let saveButton = document.querySelector('.popup__save-button');

nameInput.value = userName.textContent;
jobInput.value = userBio.textContent;

profileEditButton.addEventListener('click', function() {
  popup.classList.add('popup_opened_true');
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened_true');
});

function saveBtnClicked() {
  popup.classList.remove('popup_opened_true');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userBio.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', saveBtnClicked);
