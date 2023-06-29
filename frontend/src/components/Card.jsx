import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, deleteCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like-active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    deleteCardClick(card._id);
  }
  return (
    <li className="element">
      <img
        className="element__image "
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__column">
        <h2 className="element__text">{card.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="лайк"
            onClick={handleLikeClick}
          />
          <span className="element__likes-number">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__delete-element"
          aria-label="Кнопка для Удаления"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
