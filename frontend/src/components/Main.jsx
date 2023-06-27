import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import pencil from "../images/pencil.svg";
import plus from "../images/plus.svg";
import { useContext } from "react";

function Main({
  onEditAvatar,
  onEditProfile,
  onNewCard,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      deleteCardClick={onCardDelete}
      onCardLike={onCardLike}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__image"
          src={currentUser.avatar}
          alt="Аватар пользователя"
        />
        <button className="profile__button-avatar" onClick={onEditAvatar} />

        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button profile__edit"
              aria-label="изменить"
              onClick={onEditProfile}
            >
              <img
                className="profile__button-image"
                src={pencil}
                alt="карандаш"
              />
            </button>
          </div>
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
        <button
          className="profile__addbutton"
          aria-label="добавить"
          onClick={onNewCard}
        >
          <img className="profile__addbutton-image" src={plus} alt="плюс" />
        </button>
      </section>
      <section>
        <ul className="elements">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
