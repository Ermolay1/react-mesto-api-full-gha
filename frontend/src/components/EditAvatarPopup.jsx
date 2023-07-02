import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, isLoading, onUpdateAvatar, onClose }) {
  const [link, setLink] = useState("");
  const [linkDirty, setLinkDirty] = useState(false);
  const [linkError, setLinkError] = useState("Это поле не может быть пустым");
  const formValid = linkError || link === "";

  useEffect(() => {
    
    if (!isOpen) {
      setLink("");
      setLinkError("Это поле не может быть пустым");
      setLinkDirty(false);
    }
  }, [isOpen]);

  const setBlurHandler = (e) => {
    setLinkDirty(true);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    if (!e.target.validity.valid) setLinkError(e.target.validationMessage);
    else setLinkError("");
  };

  const linkSpanClassName = `popup__input-error popup-avatar-error
    ${linkDirty && linkError ? "popup__input-error_active" : ""}`;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение" : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={formValid}
    >
      <input
        id="popup-avatar"
        className="popup__input popup__form-input popup__input_type_value-link"
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
export default EditAvatarPopup;
