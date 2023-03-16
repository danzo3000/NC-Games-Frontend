import { Link } from "react-router-dom";

const NavBar = ({ isUserLoggedIn, user, setIsUserLoggedIn, setUser }) => {
  return (
    <nav className="navBar">
      <ul>
        <li>
          <Link className="noUnderline green" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="noUnderline blue" to="/users">
            Users
          </Link>
        </li>
        <li className="navUserButton">
          {isUserLoggedIn ? (
            <div className="smallUserIcon">
              <img src={user.avatar_url} alt={user.username} />
              <p>{user.username}</p>
            </div>
          ) : (
            <Link className="loginButtonText" to="/users">
              LOGIN
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
