import './App.css';
import { BrowserRouter, Router, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import UserPage from "./pages/UserPage"
import SearchPage from "./pages/HomePage"

function App() {
  console.log(Date.now())
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Routes path="/" elements={HomePage} />
          <Routes path="/design/:designID" elements={DetailsPage} />
          <Routes path="/profile/:userID" elements={UserPage} />
          <Routes path="/:id" elements={SearchPage} />
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
