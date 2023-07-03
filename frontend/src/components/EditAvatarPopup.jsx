import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  function onSubmit({ avatar }) {
    onUpdateAvatar({ avatar });
  }

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"change-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isDirty={isDirty}
    >
      <input
        className={classNames("popup__input", {
          popup__input_type_error: errors.avatar?.message,
        })}
        placeholder="Ссылка на картинку"
        type="url"
        {...register("avatar", {
          required: {
            value: true,
            message: "Please enter a URL.",
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
          "popup__input-error-msg_active": errors.avatar?.message,
        })}
      >
        {errors.avatar?.message}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
