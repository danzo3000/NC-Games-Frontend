import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview.jsx";

function App() {
  const [currentVotes, setCurrentVotes] = useState(0);
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews
              currentVotes={currentVotes}
              setCurrentVotes={setCurrentVotes}
            />
          }
        />
        <Route
          path="/reviews"
          element={
            <Reviews
              currentVotes={currentVotes}
              setCurrentVotes={setCurrentVotes}
            />
          }
        />
        <Route
          path="/reviews/:review_id"
          element={
            <SingleReview
              currentVotes={currentVotes}
              setCurrentVotes={setCurrentVotes}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
