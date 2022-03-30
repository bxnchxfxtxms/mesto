export default class UserInfo {
  constructor({ name, bio }) {
    this._userName = document.querySelector(name);
    this._userBio = document.querySelector(bio);
  }

  getUserInfo(formName) {
    this._formSelector = document.forms.namedItem(formName);
    this._formSelector.elements[1].value = this._userName.textContent;
    this._formSelector.elements[2].value = this._userBio.textContent;
  }

  setUserInfo(data) {
    this._userName.textContent = data.field1;
    this._userBio.textContent = data.field2;
  }
}