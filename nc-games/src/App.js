import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;
