export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleMouseClickClose (event) {
    if ((event.target.classList.contains('popup')) || (event.target.classList.contains('popup__close-button'))) {
      this.close();
    }
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
  
  _removeEventListeners() {
    window.removeEventListener('keydown', this._handleEscClose);
  }
    
  open() {
    this._popupSelector.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (event) => {
      this._handleMouseClickClose(event);
    })
  }
}