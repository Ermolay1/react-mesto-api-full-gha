import classNames from "classnames";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  isValid,
  isDirty,
}) {
  return (
    <div
      className={classNames("popup", `popup_type_${name}`, {
        popup_active: isOpen,
      })}
    >
      <div className="popup__window">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={"popup__form"}
          name={name}
          method="POST"
          noValidate
        >
          {children}
          <button
            className={classNames("popup__submit-btn", {
              "popup__submit-btn_inactive": !isValid || !isDirty,
            })}
            type="submit"
            aria-label={buttonText}
            disabled={!isValid || !isDirty}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
