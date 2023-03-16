import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";

const Users = ({ isUserLoggedIn, setIsUserLoggedIn, user, setUser }) => {
  const [userList, setUserList] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const logout = () => {
    setIsUserLoggedIn(false);
    setUser({});
  };
  const handleClick = (user) => {
    setUser(user);
    setIsUserLoggedIn(true);
  };
  useEffect(() => {
    setIsLoadingUsers(true);
    getUsers().then((users) => {
      setUserList(users);
      setIsLoadingUsers(false);
    });
  }, []);
  if (isLoadingUsers) {
    return <p className="loading">Loading Users...</p>;
  }
  return (
    <div>
      <div>
        {!isUserLoggedIn ? (
          <p className="userInstructions">Please select a user from the list</p>
        ) : (
          <div>
            <p className="userInstructions">
              <span className="username">{user.name}</span> is logged in
            </p>
            <button className="logoutButton" onClick={() => logout()}>
              LOGOUT
            </button>
          </div>
        )}
      </div>
      <ul className="usersList">
        {userList.map((thisUser) => {
          return (
            <li
              className={
                isUserLoggedIn && user.username === thisUser.username
                  ? "highlightUserCard"
                  : "userCard"
              }
              key={thisUser.name}
              onClick={() => handleClick(thisUser)}
            >
              <img
                className="userAvatar"
                src={thisUser.avatar_url}
                alt={thisUser.username}
              />
              <h3 className="userCardName">{thisUser.name}</h3>
              <h4 className="userCardUsername">
                Username: {thisUser.username}
              </h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
