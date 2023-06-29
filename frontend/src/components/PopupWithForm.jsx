import React, { useEffect } from "react";
import Form from "./Form";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  buttonText,
  isFormValid,
}) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen]);

  const popupClass = `popup  popup_type_${name} ${
    isOpen ? "popup_opened" : ""
  }`;
  return (
    <section className={popupClass} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close popup__button-close"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <Form
          onSubmit={onSubmit}
          title={title}
          name={name}
          children={children}
          buttonText={buttonText}
          isFormValid={isFormValid}
        ></Form>
      </div>
    </section>
  );
}

export default PopupWithForm;
