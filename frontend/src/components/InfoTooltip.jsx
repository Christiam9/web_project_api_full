export default function InfoTooltip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose}></button>

        <div className="popup__content">
          {isSuccess ? (
            <p>¡Registro exitoso!</p>
          ) : (
            <p>Algo salió mal. Inténtalo de nuevo.</p>
          )}
        </div>
      </div>
    </div>
  );
}
