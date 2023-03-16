import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview.jsx";
import Users from "./components/Users";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <NavBar
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        user={user}
        setUser={setUser}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/reviews/:review_id"
          element={
            <SingleReview
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              user={user}
            />
          }
        />
        <Route
          path="/users"
          element={
            <Users
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/categories/:category_slug" element={<Reviews />} />
        <Route
          path="/*"
          element={
            <p className="BadPathMessage">
              404: Path Not Found! Check the URL or click 'Home' to head to our
              homepage!
            </p>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
