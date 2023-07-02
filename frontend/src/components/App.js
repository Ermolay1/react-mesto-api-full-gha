import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import NewCardPopup from "./NewCardPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { useNavigate, Route, Routes } from "react-router-dom";
import authApi from "../utils/AuthApi";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [removedCardId, setRemovedCardId] = useState(" ");
  const [headerEmail, setHeaderEmail] = useState("");
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = useState(false);
  const [isInfoTolltipFail, setIsInfotolltipFail] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  
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
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setHeaderEmail(data.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function showTooltipResponse(signedIn) {
    setIsInfoTolltipSuccess(true);
    setSignedIn(signedIn);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleNewCardClick() {
    setIsNewCardPopupOpen(true);
  }

  function handleCardClick(cardId) {
    setIsImagePopupOpen(true);
    setSelectedCard(cardId);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setRemovedCardId(card);
  }

  function closeAllPopups() {
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false);
    if (isNewCardPopupOpen) setIsNewCardPopupOpen(false);
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false);
    if (isImagePopupOpen) setIsImagePopupOpen(false);
    if (isDeletePopupOpen) setIsDeletePopupOpen(false);
    if (isInfoTolltipFail) setIsInfotolltipFail(false);
    if (isInfoTolltipSuccess) setIsInfoTolltipSuccess(false);
  }

  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);
  const [isLoadingNewCard, setIsLoadingNewCard] = useState(false);
  const [isLoadingUpdateAvatar, setIsLoadingUpdateAvatar] = useState(false);

  function handleUpdateUser(userData) {
    setIsLoadingUpdateUser(true);
  
    api
      .createNewUser(userData.name, userData.description)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingUpdateUser(false));
  }

  function handleDeleteCard(card) {
    setIsLoadingDeleteCard(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._Id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => 
        setIsLoadingDeleteCard(false)
      );
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddNewCard(card) {
    setIsLoadingNewCard(true);
    api
      .addNewCard({ item: card })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingNewCard(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingUpdateAvatar(true);
    api
      .editAvatar(data.link)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => 
        setIsLoadingUpdateAvatar(false)
      );
  }

  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          showTooltipResponse(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        showTooltipResponse(false);
        console.log(err);
      })
      .finally(() => isInfoTolltipSuccess(true));
  }

  function handleAuthUser(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        showTooltipResponse(false);
        setIsInfoTolltipSuccess(true);
        console.log(err);
      });
  }
  
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setHeaderEmail("");
    localStorage.removeItem("jwt");
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={headerEmail} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onCardDelete={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                  setCards={setCards}
                  onEditProfile={handleEditProfileClick}
                  onNewCard={handleNewCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegisterUser} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleAuthUser} />}
            />
          </Routes>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoadingUpdateAvatar}
          ></EditAvatarPopup>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoadingUpdateUser}
          ></EditProfilePopup>
          <NewCardPopup
            isOpen={isNewCardPopupOpen}
            onClose={closeAllPopups}
            onNewCard={handleAddNewCard}
            isLoading={isLoadingNewCard}
          ></NewCardPopup>
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoadingDeleteCard}
            onSubmit={handleDeleteCard}
            card={removedCardId}
          ></DeleteCardPopup>

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={setIsImagePopupOpen}
          />
          <InfoTooltip
            name={"success"}
            onClose={closeAllPopups}
            isOpen={isInfoTolltipSuccess}
            signedIn={signedIn}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
