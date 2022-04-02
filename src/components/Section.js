export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._sectionElement = containerSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item)
    });
  }

  addItem(item) {
    this._sectionElement.prepend(item);
  }
}