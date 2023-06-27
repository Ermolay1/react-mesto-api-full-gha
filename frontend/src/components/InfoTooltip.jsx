import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";
function InfoTooltip({ onClose, isOpen, signedIn }) {
  const message = signedIn
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  const tooltip = signedIn ? success : fail;
  return (
    <div className={`popup  ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container popup__container_success">
        <img src={tooltip} className={`popup__success`} alt="fd" />
        <h2 className="popup__title">{message}</h2>
        <button type="button"
         className="popup__close popup__button-close popup__button-success"
         onClick={onClose}
         aria-label="закрыть"
        >
        </button>
      </div>
    </div>
  );
}
export default InfoTooltip;