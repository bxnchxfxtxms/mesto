export class Card {
  constructor(data, cardSelector, openPictureZoomPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPictureZoomPopup = openPictureZoomPopup;
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
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPictureZoomPopup();
    })
  }
  
  _toggleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _fillCard() {
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._fillCard();
    return this._element;
  }
}
