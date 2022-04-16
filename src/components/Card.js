export default class Card {
  constructor(data, cardSelector,
    {
      handleCardClick,
      handleCardDelete,
      handleLikeButtonClick
    },
    currentUserData) {

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserData = currentUserData;
    this._card = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeButtonClick = handleLikeButtonClick

  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._card)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this._cardId, this._checkOwnerLikes());
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._cardId);
    })
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
  
  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
  
  _checkOwnerLikes() {
    let state;
    this._likeButton.classList.contains('element__like-button_active') ? state = true : state = false;
    return state;
  }
  
  _setOwnerLikes() {
    this._currentUserData
    .then(item => {
      this._likes.forEach(like => {
        if (like._id === item._id) {
          this._likeButton.classList.add('element__like-button_active')
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  deleteCard() {
    this._element.remove();
  }
  
  setLikes(data) {
    this._likeCounter.textContent = data.likes.length
    this._toggleLike()
  }

  _setDeleteButton() {
    this._currentUserData
    .then(item => {
      if (item._id === this._ownerId) {
        this._deleteButton.classList.add('element__delete-button_visible')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  _fillCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setDeleteButton()
    this._setEventListeners();
    this._fillCard();
    this._setOwnerLikes()
    return this._element;
  }
}