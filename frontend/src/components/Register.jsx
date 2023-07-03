import classNames from "classnames";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ registerUser, buttonText }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    registerUser(formValue);
  }

  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className={"entry__form"}
        name="register"
        method="POST"
        // noValidate
      >
        <input
          className="entry__input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          required
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          className="entry__input"
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="current-password"
          required
          value={formValue.password}
          onChange={handleChange}
        />
        <button
          className={classNames("entry__submit-btn", {
            // "entry__submit-btn_inactive": !isValid || !isDirty,
          })}
          type="submit"
          aria-label={buttonText}
          // disabled={!isValid || !isDirty}
        >
          {buttonText}
        </button>
      </form>
      <p className="entry__question">
        Уже зарегистрированы?
        <Link to="/sign-in" className="entry__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
