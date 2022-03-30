import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor( { submitForm }, popupSelector, formName) {
    super(popupSelector);
    this._formElement = document.forms.namedItem(formName);
    this._submitForm = submitForm;
  }

  close() {
    super.close();
    this._formElement.reset()
    this._removeEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmitForm)
    }

  _removeEventListeners() {
    super._removeEventListeners()
  this._formElement.removeEventListener('submit', this._handleSubmitForm)
  }

  _getInputValues() {
    const gatheredData = {
    field1: this._formElement.elements[1].value,
    field2: this._formElement.elements[2].value
    }
    return gatheredData;
  }
  
  _handleSubmitForm = (event) => {
    event.preventDefault();
    const data = this._getInputValues();
    this._submitForm(data);
  }
}