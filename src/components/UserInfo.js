export default class UserInfo {
  constructor({ name, bio }) {
    this._userName = document.querySelector(name);
    this._userBio = document.querySelector(bio);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      bio: this._userBio.textContent
    };
    return userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userBio.textContent = data.bio;
  }
}