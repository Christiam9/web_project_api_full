export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div className="popup popup_type_image" onClick={handleOverlayClick}>
      <div className="popup__content popup__content_content_image">
        <button
          className="popup__close"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        ></button>

        <img src={card.image} alt={card.title} className="popup__image" />

        <p className="popup__caption">{card.title}</p>
      </div>
    </div>
  );
}
