import {openModal, cardPreview, modalFullScreenImg, modalFullScreenNameImg} from './twoscript.js'
class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#templateElement').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    return this._element;
  }

  _handleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_no-active');
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDelete() {
    this._element.remove();
  }

  _openCardPreview() {
    openModal(cardPreview)
    cardPreview.classList.add('popup_full')
    modalFullScreenImg.src = this._link
    modalFullScreenNameImg.textContent = this._name
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    })

    this._element.querySelector('.element__delite').addEventListener('click', () => {
      this._handleDelete();
    })

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._openCardPreview();
    })
  }
  
}

export default Card;