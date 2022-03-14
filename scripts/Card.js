export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    })
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
  
  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _fillCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();
    this._fillCard();
    return this._element;
  }
}
