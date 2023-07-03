import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo-mesto_color_white.svg";

function Header({ email, logout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место россия" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__entry">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__entry">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__entry-containter">
              <p className="header__email">{email}</p>
              <Link
                to="/sign-in"
                className="header__entry header__entry_logout"
                onClick={logout}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
