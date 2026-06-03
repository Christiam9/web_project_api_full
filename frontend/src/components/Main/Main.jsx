import { useState, useContext } from "react";
import api from "../../utils/api";

import Card from "../Card/Card";
import Popup from "./Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfile from "./form/EditProfile/EditProfile";
import EditAvatar from "./form/EditAvatar/EditAvatar";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  setCards,
  onUpdateUser,
  onUpdateAvatar,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  console.log("POPUP STATE:", popup);

  // OPEN POPUP
  function handleOpenPopup(type) {
    setPopup(type);
  }

  // CLOSE ALL
  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  // ADD CARD
  function handleAddCard(data) {
    return api
      .addCard(data)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        handleClosePopup();
      })
      .catch(console.log);
  }

  // UPDATE USER
  function handleUpdateUserAndClose(data) {
    onUpdateUser(data);
    handleClosePopup();
  }

  // UPDATE AVATAR
  function handleUpdateAvatarAndClose(data) {
    onUpdateAvatar(data);
    handleClosePopup();
  }

  // DELETE CARD
  function handleDeleteCard(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== id));
      })
      .catch(console.log);
  }

  // LIKE CARD
  function handleCardLike(card) {
    const request = card.isLiked
      ? api.unlikeCard(card._id)
      : api.likeCard(card._id);

    request
      .then((newCard) => {
        setCards((prev) => prev.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(console.log);
  }

  return (
    <main className="content">
      {/* PROFILE */}
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="profile__avatar"
          />

          <button
            className="profile__avatar-edit"
            onClick={() => handleOpenPopup("editAvatar")}
          />
        </div>

        <div className="profile__details">
          <h2 className="profile__name">{currentUser?.name}</h2>

          <button
            className="profile__edit-btn"
            onClick={() => handleOpenPopup("editProfile")}
          />

          <p className="profile__about">{currentUser?.about}</p>
        </div>

        <button
          className="profile__add-btn"
          onClick={() => handleOpenPopup("newCard")}
        />
      </section>

      {/* CARDS */}
      <section className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
            onCardClick={setSelectedCard}
          />
        ))}
      </section>

      {/* POPUPS */}
      {popup === "newCard" && (
        <Popup
          title="Nuevo lugar"
          onClose={handleClosePopup}
          isOpen={popup === "newCard"}
        >
          <NewCard onAddCard={handleAddCard} />
        </Popup>
      )}

      {popup === "editProfile" && (
        <Popup
          title="Editar perfil"
          onClose={handleClosePopup}
          isOpen={popup === "editProfile"}
        >
          <EditProfile onUpdateUser={handleUpdateUserAndClose} />
        </Popup>
      )}

      {popup === "editAvatar" && (
        <Popup
          title="Editar avatar"
          onClose={handleClosePopup}
          isOpen={popup === "editAvatar"}
        >
          <EditAvatar onUpdateAvatar={handleUpdateAvatarAndClose} />
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={handleClosePopup}
          isOpen={!!selectedCard}
        />
      )}
    </main>
  );
}
