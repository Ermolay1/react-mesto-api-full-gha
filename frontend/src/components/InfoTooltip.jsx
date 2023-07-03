import classNames from "classnames";
import errorIcon from "../images/icon_error.svg";
import successIcon from "../images/icon_success.svg";

function InfoTooltip({ isOpen, onClose, status }) {
  const statusIcon = status ? successIcon : errorIcon;
  const statusMessage = status
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div
      className={classNames("popup", {
        popup_active: isOpen,
      })}
    >
      <div className="tooltip">
        <button
          onClick={onClose}
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть попап"
        />
        <img
          className="tooltip__image"
          src={statusIcon}
          alt={status ? "иконка успеха" : "иконка неудачи"}
        />
        <p className="tooltip__text">{statusMessage}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
