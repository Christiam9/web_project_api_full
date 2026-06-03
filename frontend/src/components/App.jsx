import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // ---------------- AUTH ----------------

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch(console.log);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
        setTimeout(() => navigate("/signin"), 1500);
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function closeTooltip() {
    setIsTooltipOpen(false);
  }

  // ---------------- DATA ----------------

  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.log);
  }, []);

  useEffect(() => {
    api.getInitialCards().then(setCards).catch(console.log);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .getContent(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserEmail(data.data.email);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsAuthChecked(true);
        });
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  // ---------------- UPDATE ----------------

  function handleUpdateUser(data) {
    return api.editUserInfo(data).then(setCurrentUser).catch(console.log);
  }

  function handleUpdateAvatar(data) {
    return api.updateAvatar(data).then(setCurrentUser).catch(console.log);
  }

  // ---------------- RENDER ----------------

  if (!isAuthChecked) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    userEmail={userEmail}
                    onLogout={handleLogout}
                  />

                  <Main
                    cards={cards}
                    setCards={setCards}
                    onUpdateUser={handleUpdateUser}
                    onUpdateAvatar={handleUpdateAvatar}
                  />

                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>

        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
