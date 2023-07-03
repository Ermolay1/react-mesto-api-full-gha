import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDeleteConfirm,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-btn">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка пользователя"
          />
        </button>
        <div className="profile__user-info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-btn"
            type="button"
            aria-label="Редактировать профиль"
          ></button>
          <p className="profile__user-occupation">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__btn-add-img"
          type="button"
          aria-label="Добавить изображение"
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDeleteConfirm={onCardDeleteConfirm}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
