import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/reviews/:review_id"
          element={
            <SingleReview isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
