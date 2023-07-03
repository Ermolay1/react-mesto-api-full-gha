import classNames from "classnames";
import { useState } from "react";

function Login({ loginUser, buttonText }) {
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
    loginUser(formValue);
  }
  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
      <form
        onSubmit={handleSubmit}
        className={"entry__form"}
        name="login"
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
    </div>
  );
}

export default Login;
