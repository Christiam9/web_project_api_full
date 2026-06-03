import { useState, useEffect } from "react";

export default function NewCard({ onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsValid(name.length >= 2 && link.length >= 2);
  }, [name, link]);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSaving(true);

    onAddCard({ name, link }).finally(() => {
      setIsSaving(false);
      setName("");
      setLink("");
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          name="card-name"
          value={name}
          placeholder="Title"
          required
          type="text"
          onChange={handleNameChange}
        />
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
      </label>

      <button
        className="popup__button-save"
        disabled={!isValid || isSaving}
        type="submit"
      >
        {isSaving ? "Creando..." : "Guardar"}
      </button>
    </form>
  );
}
