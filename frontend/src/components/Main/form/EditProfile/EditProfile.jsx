import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdateUser }) {
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSaving(true);

    onUpdateUser({ name, about }).finally(() => setIsSaving(false));
  }

  useEffect(() => {
    const form = document.getElementById("edit-profile-form");
    if (form) {
      setIsValid(form.checkValidity());
    }
  }, [name, about]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAbout(currentUser.about || "");
    }
  }, [currentUser]);

  function handleNameChange(e) {
    const value = e.target.value;

    setName(value);

    if (e.target.validity.valid) {
      setNameError("");
    } else {
      setNameError(e.target.validationMessage);
    }
  }

  function handleAboutChange(e) {
    const value = e.target.value;

    setAbout(value);

    if (e.target.validity.valid) {
      setAboutError("");
    } else {
      setAboutError(e.target.validationMessage);
    }
  }

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
        <input
          className={`popup__input popup__input_type_name ${
            nameError ? "popup__input_type_error" : ""
          }`}
          id="profile-name"
          name="name"
          type="text"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="text-error">{nameError}</span>
      </fieldset>

      <fieldset className="popup__field">
        <input
          className={`popup__input popup__input_type_description ${
            aboutError ? "popup__input_type_error" : ""
          }`}
          id="profile-description"
          name="about"
          type="text"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          value={about}
          onChange={handleAboutChange}
          required
        />
        <span className="text-error">{aboutError}</span>
      </fieldset>

      <button
        className={`popup__button-save ${
          !isValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isValid || isSaving}
        type="submit"
      >
        {isSaving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
