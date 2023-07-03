import classNames from "classnames"

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={classNames(
      "popup",
      "popup_type_open-image",
      {"popup_active": isOpen})}
    >
      <figure className="popup__image-figure">
        <button
          onClick={onClose}
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть попап"
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-title">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
