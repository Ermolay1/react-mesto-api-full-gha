import React, {useEffect} from "react";

function ImagePopup({isOpen, onClose, card }) {

    const popupClass = `popup popup_type_image ${isOpen ? 'popup_opened' : ''}`;

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClose)
            return () => document.removeEventListener('keydown', handleEscClose)
        }
    }, [isOpen, onClose])

    return (
        <section className={popupClass} onClick={() => onClose()}
        >
         <button type="button"
             className="popup__close popup__button-close popup__button-closeImage" 
             aria-label="закрыть"
             onClick={onClose}
             />
         <figure className="popup__figure">
            <img className="popup__image " 
              src={card.link}
              alt={card.name}
             />
            <h5 className="popup__image-name">{card.name}</h5>
         </figure>
       </section>
    )
}

export default ImagePopup;