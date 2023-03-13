import { Route, Routes } from "react-router-dom";
import "./App.css";
import CategorySort from "./components/CategorySort.jsx";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <CategorySort />
      <Reviews />
      <Routes>
        <Route path="/reviews/:review_id" element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;
