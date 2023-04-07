export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._startArray = items;
        this._renderer = renderer;
        this._itemsContainer = document.querySelector(containerSelector);
    }

    rendererAll() {
        this._startArray.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(element) {
        this._itemsContainer.prepend(element);
    }

}