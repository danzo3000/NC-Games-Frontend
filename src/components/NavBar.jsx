import { Link } from "react-router-dom";

const NavBar = ({ isUserLoggedIn, user }) => {
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
            <Link to="/users">
              <div className="smallUserIcon">
                <img src={user.avatar_url} alt={user.username} />
                <p>{user.username}</p>
              </div>
            </Link>
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
