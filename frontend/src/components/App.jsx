import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import defaultAvatarImage from "../images/loading_circle.gif";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/authApi";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Loading name...",
    about: "Loading about...",
    avatar: defaultAvatarImage,
  });
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt){
      Promise.all([api.getCards(),api.getCurrentUser()])
        .then(([cardData, userData]) => {
          setCards(cardData.reverse());
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getUserData(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserData({ ...userData, email: res.email });
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate, userData]);

  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOnOverlayClick(e) {
      if (e.target.classList.contains("popup_active")) {
        closeAllPopups();
      }
    }

    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isImagePopupOpen ||
      isConfirmPopupOpen ||
      isInfoTooltipOpen
    ) {
      document.addEventListener("keyup", closeOnEsc);
      document.addEventListener("click", closeOnOverlayClick);
    }
    return () => {
      document.removeEventListener("click", closeOnOverlayClick);
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isImagePopupOpen,
    isConfirmPopupOpen,
    isInfoTooltipOpen,
  ]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDeleteConfirm(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);

    api
      .createNewUser(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);

    api
      .createNewAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(userCard) {
    setIsLoading(true);

    api
      .createNewCard(userCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // В планах зарефакторить authApi, сделать хедер под мобильную версию,
  // Так что не бейте слишком строго) просто сроки горят.

  function registerUser({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setStatus(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function loginUser({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserData({ email });
        setIsLoggedIn(true);
        navigate("/"); // NAVIGATE ?
      })
      .catch((err) => {
        console.log(err);
        setStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function logoutUser() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({ email: "" });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userData.email} logout={logoutUser} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteConfirm={handleCardDeleteConfirm}
                cards={cards}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/sign-in"
            element={<Login loginUser={loginUser} buttonText={"Войти"} />}
          />
          <Route
            path="/sign-up"
            element={
              <Register
                registerUser={registerUser}
                buttonText={"Зарегистрироваться"}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={status}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
