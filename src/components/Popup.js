export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
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
  
//  _removeEventListeners() {
//    window.removeEventListener('keydown', this._handleEscClose);
//  }
    
  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose)
    //this._removeEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      this._handleMouseClickClose(event);
    })
  }
}