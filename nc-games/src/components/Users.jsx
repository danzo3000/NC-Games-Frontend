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
    return <p>Loading Users...</p>;
  }
  return (
    <div>
      <div>
        {!isUserLoggedIn ? (
          <p>Please select a user from the list</p>
        ) : (
          <div>
            <p>Logged in as {user.name}</p>
            <button onClick={() => logout()}>LOGOUT</button>
          </div>
        )}
      </div>
      <ul>
        {userList.map((user) => {
          return (
            <li key={user.name} onClick={() => handleClick(user)}>
              <img src={user.avatar_url} alt={user.username} />
              <h3>{user.name}</h3>
              <h4>Username: {user.username}</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;

// could have some css that highlights the currently logged-in User profile
