import React from "react";

function SubmitButton({ isFormValid, buttonText }) {
  const buttonClassName = `popup__button popup__button-save  ${
    isFormValid ? "popup__button-save_inactive" : ""
  }`;
  return (
    <button className={buttonClassName} type="submit" disabled={isFormValid}>
      {buttonText}
    </button>
  );
}

function Form({ name, buttonText, isFormValid, children, onSubmit }) {
  return (
    <form className="popup__form " name={name} onSubmit={onSubmit}>
      {children}
      <SubmitButton
        buttonText={buttonText}
        isFormValid={isFormValid}
      ></SubmitButton>
    </form>
  );
}
export default Form;
