export default class Section {
  constructor({renderer}, containerSelector) {
    this._sectionElement = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
      items.forEach(item => {
      this._renderer(item)
    });
  }

  addItem(item) {
    this._sectionElement.prepend(item);
  }
}