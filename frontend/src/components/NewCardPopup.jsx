import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function NewCardPopup({ isOpen, isLoading, onNewCard, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [linkDirty, setLinkDirty] = useState(false);
  const [nameError, setNameError] = useState("Это поле не может быть пустым");
  const [linkError, setLinkError] = useState("Это поле не может быть пустым");
  const formValid = nameError || linkError || name === "" || link === "";

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
      setNameError("Это поле не может быть пустым");
      setLinkError("Это поле не может быть пустым");
      setLinkDirty(false);
      setNameDirty(false);
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.validity.valid) setNameError(e.target.validationMessage);
    else setNameError("");
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    if (!e.target.validity.valid) setLinkError(e.target.validationMessage);
    else setLinkError("");
  };

  const setBlurHandler = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "link":
        setLinkDirty(true);
        break;
    }
  };

  const nameSpanClassName = ` popup__input-error  popup-img-error
    ${nameDirty && nameError ? "popup__input-error_active" : ""}`;

  const linkSpanClassName = `popup__input-error popup-link-error  
    ${linkDirty && linkError ? "popup__input-error_active" : ""}`;

  function handleSubmit(e) {
    e.preventDefault();
    onNewCard({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="new-card"
      title="Новое место"
      buttonText={isLoading ? "Сохранение" : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={formValid}
    >
      <input
        id="popup-img"
        className="popup__input popup__input_type_value-name"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onBlur={(e) => setBlurHandler(e)}
        onChange={(e) => handleNameChange(e)}
      />
      <span className={nameSpanClassName}>{nameError}</span>
      <input
        id="popup-link"
        className="popup__input popup__input_type_value-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        value={link}
        onBlur={(e) => setBlurHandler(e)}
        onChange={(e) => handleLinkChange(e)}
      />
      <span className={linkSpanClassName}>{linkError}</span>
    </PopupWithForm>
  );
}

export default NewCardPopup;
