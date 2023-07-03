import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onCardDelete, card, isLoading }) {
  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm();

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"confirm"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Да"}
      onSubmit={handleSubmit(handleCardDelete)}
      isValid={isValid}
      isDirty={!isDirty}
    />
  );
}

export default ConfirmationPopup;
