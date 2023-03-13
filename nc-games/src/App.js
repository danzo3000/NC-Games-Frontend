import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
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
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentVotes={currentVotes}
              setCurrentVotes={setCurrentVotes}
            />
          }
        />
        <Route
          path="/:review_id"
          element={
            <SingleReview
              isLoading={isLoading}
              setIsLoading={setIsLoading}
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
