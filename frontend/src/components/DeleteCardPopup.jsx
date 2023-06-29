import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onSubmit, isLoading, onClose, onDeleteCard, card, submitTitle }) {

   const popupClass = `popup popup_type_delete-card ${
    isOpen ? "popup_opened" : ""
  }`;

 function handleDeleteCard(evt) {
    evt.preventDefault();
   onSubmit(card);
   
 }
  return (
    <PopupWithForm
      popup={popupClass}
      name="deleteForm"
      title="Вы уверены?"
      submitTitle={submitTitle}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleDeleteCard}
      buttonText={isLoading ? "Удаление" : "Да"}

      >
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
