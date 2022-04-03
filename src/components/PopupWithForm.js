import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor( { submitForm }, popupSelector) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector('.popup__form')
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
    this._inputList = this._formElement.querySelectorAll('.popup__input-field');
    this._inputList.forEach(input => gatheredData[input.name] = input.value);
    console.dir(gatheredData)
    return gatheredData;
}

//  _getInputValues() {
//    const gatheredData = {};
//    for (let i = 0; i < this._formElement.length; i++) {
//      if (this._formElement.elements[i].localName === 'input') {
//        gatheredData['field'+[i]] = this._formElement.elements[i].value;
//      }
//    }
//    return gatheredData;
//  }

  _handleSubmitForm = (event) => {
    event.preventDefault();
    const data = this._getInputValues();
    this._submitForm(data);
  }
}