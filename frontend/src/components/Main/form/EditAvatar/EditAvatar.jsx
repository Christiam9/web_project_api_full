import { useState } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsSaving(true);

    onUpdateAvatar({ avatar }).finally(() => {
      setIsSaving(false);
      setAvatar("");
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          id="profile-avatar"
          name="avatar"
          placeholder="Avatar link"
          required
          type="url"
          value={avatar}
          onChange={handleChange}
        />
      </fieldset>

      <button
        className="popup__button-save"
        type="submit"
        disabled={!avatar || isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
