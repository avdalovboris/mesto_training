import Card from "./twoCard.js";
import FormValidator  from "./twoFormValidator.js";


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  form: '.popup__form',
  input: '.popup__field',
  inputError: 'popup__field_error',
  button: '.popup__button',
  buttonActive: 'popup__button_inactive',
  disabled: ['disabled', 'true'],
  errorSpanActive: 'error__active',
  newCardNameInput: document.querySelector('#name-card'),
  newCardLinkInput: document.querySelector('#link'),
  modalEditProfile: document.querySelector('#popupEditProfile'),
  modalAddPhoto: document.querySelector('#popupAddPhoto'),
}

const userValidate = new FormValidator(config, config.modalEditProfile);
const cardValidate = new FormValidator(config, config.modalAddPhoto);

                      //дом edit profile
const modalEditProfile = document.querySelector('#popupEditProfile')
const btnOpenModalEditProfile = document.querySelector('.profile__edit')
const btnCloseModalEditProfile = modalEditProfile.querySelector('.popup__close')
                      //дом add photo
const modalAddPhoto = document.querySelector('#popupAddPhoto')
const btnOpenModalAddPhoto = document.querySelector('.profile__add')
const btnCloseModalAddPhoto = modalAddPhoto.querySelector('.popup__close')
                      
const elementsLists = document.querySelector('.elements__list')
const cardPreview = document.querySelector('#popupFullScreen')
const templateElement = document.querySelector('#templateElement').content
const profileName = document.querySelector('.profile__full-name') 
const profileJob = document.querySelector('.profile__profession') 
const profileNameInput = modalEditProfile.querySelector('#user-name');
const profileJobInput = modalEditProfile.querySelector('#user-job');
const newCardNameInput = modalAddPhoto.querySelector('#name-card')
const newCardLinkInput = modalAddPhoto.querySelector('#link')
const modalFullScreenImg = cardPreview.querySelector('.full-screen__img')
const modalFullScreenNameImg = cardPreview.querySelector('.full-screen__text')
const nameNewPhotoName = modalAddPhoto.querySelector('#name-card')
const nameNewPhotoSrc = modalAddPhoto.querySelector('#link')

                      //open and close popup
function openModal(modal) {
  modal.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupClickEsc)
}

function closeModal(modal) {
  modal.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupClickEsc)
}

function closePopupClickEsc(evt) {
  const nameOpenModal = document.querySelector('.popup_opened')
  if(evt.key === "Escape") {
    closeModal(nameOpenModal)
  }
}

                      //edit profile: open | close | submit
function openeModalEditProfile() {
  openModal(modalEditProfile)
  profileNameInput.value = profileName.textContent
  profileJobInput.value = profileJob.textContent
  const inputList = Array.from(modalEditProfile.querySelectorAll('.popup__field'));
  const buttonElement = modalEditProfile.querySelector('.popup__button')
  userValidate
}

function closeModalEditProfile() {
  closeModal(modalEditProfile)
}

function profileFormSubmitHandler (submit) {
  submit.preventDefault();
  profileName.textContent = profileNameInput.value
  profileJob.textContent = profileJobInput.value
  closeModalEditProfile()
}
                      //add photo open | close
function OpenModalAddPhoto() {
  openModal(modalAddPhoto)
  newCardNameInput.value = ""
  newCardLinkInput.value = ""
  const inputList = Array.from(modalAddPhoto.querySelectorAll('.popup__field'));
  const buttonElement = modalAddPhoto.querySelector('.popup__button')
  cardValidate
}

function closeModalAddPhoto() {
  closeModal(modalAddPhoto)
}

//load photo of massive | create new card | submit (add new photo on page)
function renderCards() {
  initialCards.forEach(renderCard)
}

function renderCard(item) {
  const card = new Card(item)
  const cardElement = card.generateCard()
  document.querySelector('.elements__list').prepend(cardElement)
}



function cardFormSubmitHandler(submit) {
  submit.preventDefault();
  const CardData = {
    name: `${config.newCardNameInput.value}`,
    link: `${config.newCardLinkInput.value}`
  }
  const newCard = new Card(CardData, config); 
  const cardElement = newCard.generateCard()
  elementsLists.prepend(cardElement)
  closeModalAddPhoto();
};

function closePopupClickOverlay(event) {
  if(event.target === event.currentTarget){
    closeModal(event.currentTarget)
  }
}

renderCards()
btnOpenModalEditProfile.addEventListener('click', openeModalEditProfile)
btnCloseModalEditProfile.addEventListener('click', closeModalEditProfile)
btnOpenModalAddPhoto.addEventListener('click', OpenModalAddPhoto)
btnCloseModalAddPhoto.addEventListener('click', closeModalAddPhoto)
modalEditProfile.querySelector('.popup__form').addEventListener('submit', profileFormSubmitHandler)
modalAddPhoto.querySelector('.popup__form').addEventListener('submit', cardFormSubmitHandler)
modalEditProfile.addEventListener('click', closePopupClickOverlay)
modalAddPhoto.addEventListener('click', closePopupClickOverlay)
cardPreview.querySelector('.popup__close').addEventListener('click', () => closeModal(cardPreview))
cardPreview.addEventListener('click', closePopupClickOverlay)
export {openModal, cardPreview, modalFullScreenImg, modalFullScreenNameImg, config}