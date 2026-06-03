import { Link } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onLogout }) {
  return (
    <header className="header">
      <h1 className="header__title">
        Around <span className="header__subtitle">The U.S.</span>
      </h1>

      {isLoggedIn ? (
        <div>
          <p>{userEmail}</p>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <Link to="/signin">Iniciar sesión</Link>
          <Link to="/signup">Registrarse</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
