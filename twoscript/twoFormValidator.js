import {config} from './twoscript.js'
class FormValidator {
  constructor(config, module) {
    this._module = module;
    this._formList = Array.from(document.querySelectorAll(config.form));
    this._inputList = Array.from(this._module.querySelectorAll(config.input));
    this._buttonElement = this._module.querySelector(config.button);
    this._errorElement = this._module.querySelector(this._idError);
    this._inputId = this._module.querySelector(`${config.input}`).id;
    this._idError = `${this._inputId}-error`;
    this._formElement = document.querySelector(config.form)
    this._inputElement = this._formElement.querySelector(config.input)
  }


  enableValidation = (config) => {
    this._formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      setEventListeners(this._formElement, config)
    })
  }


  _setEventListeners = (formElement, config) => {
    _toggleButtonState(this._inputList, this._buttonElement, config)
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () =>{
        _checkInputValidity(this._formElement, this._inputElement, config);
        _toggleButtonState(this._inputList, this._buttonElement, config)
      });
    }); 
  } 


  _showInputError(formElement, inputElement, errorMessage, config) {
    inputElement.classList.add(config.inputError);
    this._errorElement.textContent = errorMessage
    this._errorElement.classList.add(config.errorSpanActive)
  }


  _hideInputError(formElement, inputElement, config) {
  
    inputElement.classList.remove(config.inputError);
    this._errorElement.classList.remove(config.errorSpanActive);
    this._errorElement.textContent = ''
  }

  _checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      _showInputError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
      _hideInputError(formElement, inputElement, config)
    }
  };

  hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  _toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.buttonActive);
      buttonElement.setAttribute(config.disabled[0],[1])
    } else {
      buttonElement.removeAttribute(config.disabled[0]);
      buttonElement.classList.remove(config.buttonActive);
    } 
  }

}

export default FormValidator;