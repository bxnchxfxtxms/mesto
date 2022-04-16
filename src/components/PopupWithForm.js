import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor( { submitHandler }, popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form')
    this._submitHandler = submitHandler;
    this._formSubmitButton = this._formElement.querySelector('.popup__submit-button')
    this._inputList = this._formElement.querySelectorAll('.popup__input-field');
    this._formSubmitButtonDefaultText = this._formSubmitButton.textContent
  }

  close() {
    super.close();
    this._formElement.reset()
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formSubmitButton.textContent = 'Сохранение...';
    } else {
      this._formSubmitButton.textContent = this._formSubmitButtonDefaultText
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmitForm);
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitHandler = newSubmitHandler;
  }

  _getInputValues() { 
    const gatheredData = {};
    this._inputList.forEach(input => gatheredData[input.name] = input.value);
    return gatheredData;
  }

  _handleSubmitForm = (event) => {
    event.preventDefault();
    const data = this._getInputValues();
    this._submitHandler(data);
  }
}