import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  function onSubmit({ name, link }) {
    onAddPlace({ name, link });
  }

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-image"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isDirty={isDirty}
    >
      <input
        className={classNames("popup__input", {
          popup__input_type_error: errors.name?.message,
        })}
        placeholder="Название"
        type="text"
        {...register("name", {
          required: {
            value: true,
            message: "Name is required",
          },
          minLength: {
            value: 2,
            message: "Text must be minimum 2 characters long",
          },
          maxLength: {
            value: 30,
            message: "Text must be maximum 30 characters long",
          },
        })}
      />
      <span
        className={classNames("popup__input-error-msg", {
          "popup__input-error-msg_active": errors.name?.message,
        })}
      >
        {errors.name?.message}
      </span>
      <input
        className={classNames("popup__input", {
          popup__input_type_error: errors.link?.message,
        })}
        type="url"
        placeholder="Ссылка на картинку"
        {...register("link", {
          required: {
            value: true,
            message: "Please enter an image URL.",
          },
          pattern: {
            value:
              /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            message: "Invalid URL format",
          },
        })}
      />
      <span
        className={classNames("popup__input-error-msg", {
          "popup__input-error-msg_active": errors.link?.message,
        })}
      >
        {errors.link?.message}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
