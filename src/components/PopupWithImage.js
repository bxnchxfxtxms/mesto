import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageContainer = this._popupSelector.querySelector('.popup__image');
    this._captionContainer = this._popupSelector.querySelector('.popup__image-caption');
  }

  open(name, link) {
    super.open();
    this._imageContainer.src = link;
    this._imageContainer.alt = name;
    this._captionContainer.textContent = name;
  }
}