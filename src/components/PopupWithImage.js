import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        //this._element = document.querySelector(this._popupSelector);
        this._increaseImgLink = this._element.querySelector('.popup__photo');
        this._increaseImgText = this._element.querySelector('.popup__caption');
    }

    openPopup(text, link){
    this._increaseImgLink.src = link;
    this._increaseImgLink.alt = text;
    this._increaseImgText.textContent = text;
    super.openPopup();
    }
    
}
