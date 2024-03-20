import './styles/global.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import UserPage from "./pages/UserPage"
import SearchPage from "./pages/HomePage"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
  console.log(Date.now())
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" elements={HomePage} />
          <Route path="/design/:designID" elements={DetailsPage} />
          <Route path="/profile/:userID" elements={UserPage} />
          <Route path="/:id" elements={SearchPage} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
