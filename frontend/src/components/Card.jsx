import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import classNames from "classnames";

function Card({ card, onCardClick, onCardLike, onCardDeleteConfirm }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  return (
    <li className="cards__item">
      {isOwn && (
        <button
          className="cards__trash"
          aria-label="Удалить фото"
          onClick={() => onCardDeleteConfirm(card)}
        />
      )}
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />

      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
          <button
            className={classNames("cards__like", {
              cards__like_active: isLiked,
            })}
            aria-label="Лайкнуть фото"
            type="button"
            onClick={() => onCardLike(card)}
          />
          <p className="cards__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
