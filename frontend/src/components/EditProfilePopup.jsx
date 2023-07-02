import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, isLoading, onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [descriptionDirty, setDescriptionDirty] = useState(false);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const formValid = nameError || descriptionError;

  useEffect(() => {
    if (!isOpen) {
      setNameError("");
      setDescriptionError("");
      setDescriptionDirty(false);
      setNameDirty(false);
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.validity.valid) setNameError(e.target.validationMessage);
    else setNameError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (!e.target.validity.valid)
      setDescriptionError(e.target.validationMessage);
    else setDescriptionError("");
  };

  const setBlurHandler = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "about":
        setDescriptionDirty(true);
        break;
    }
  };

  const nameSpanClassName = `popup__input-error popup-name-error 
    ${nameDirty && nameError ? "popup__input-error_active" : ""}`;
  const aboutSpanClassName = `popup__input-error popup-description-error 
    ${descriptionDirty && descriptionError ? "popup__input-error_active" : ""}`;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение" : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={formValid}
    >
      <input
        id="popup-name"
        className="popup__input popup__input_value_name "
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onBlur={(e) => setBlurHandler(e)}
        onChange={(e) => handleNameChange(e)}
      />
      <span className={nameSpanClassName}>{nameError}</span>
      <input
        id="popup-description"
        className="popup__input popup__input_value_description"
        type="text"
        name="about"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onBlur={(e) => setBlurHandler(e)}
        onChange={(e) => handleDescriptionChange(e)}
      />
      <span className={aboutSpanClassName}>{descriptionError}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;