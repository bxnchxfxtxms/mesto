export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userName = document.querySelector(name);
    this._userBio = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      about: this._userBio.textContent,
      userId: this._userId
    };
    return userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userBio.textContent = data.about;
    this._userAvatar.src = data.avatar;
    this._userId = data._id
  }
}