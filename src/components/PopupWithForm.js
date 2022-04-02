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
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmitForm);
    }

  _getInputValues() {
    const gatheredData = {};
    for (let i = 0; i < this._formElement.length; i++) {
      if (this._formElement.elements[i].localName === 'input') {
        gatheredData['field'+[i]] = this._formElement.elements[i].value;
      }
    }
    return gatheredData;
  }

  _handleSubmitForm = (event) => {
    event.preventDefault();
    const data = this._getInputValues();
    this._submitForm(data);
  }
}