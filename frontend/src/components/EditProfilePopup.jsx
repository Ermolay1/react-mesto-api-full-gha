import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset();
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [isOpen, currentUser, reset, setValue]);

  function onSubmit({ name, about }) {
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isDirty={isDirty}
    >
      <input
        className={classNames("popup__input", {
          popup__input_type_error: errors.name?.message,
        })}
        type="text"
        placeholder="Имя"
        {...register("name", {
          required: {
            value: true,
            message: "Name required",
          },
          minLength: {
            value: 2,
            message: "Text must be minimum 2 characters long",
          },
          maxLength: {
            value: 40,
            message: "Text must be maximum 40 characters long",
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
          popup__input_type_error: errors.about?.message,
        })}
        type="text"
        placeholder="О себе"
        {...register("about", {
          required: {
            value: true,
            message: "About required",
          },
          minLength: {
            value: 2,
            message: "Text must be minimum 2 characters long",
          },
          maxLength: {
            value: 200,
            message: "Text must be maximum 200 characters long",
          },
        })}
      />
      <span
        className={classNames("popup__input-error-msg", {
          "popup__input-error-msg_active": errors.about?.message,
        })}
      >
        {errors.about?.message}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
