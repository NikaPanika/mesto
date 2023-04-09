export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._itemsContainer = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._renderer(this._itemsContainer, element);
    }

}