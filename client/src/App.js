import './styles/global.scss';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import DetailsPage from "./pages/DetailsPage"
import UserPage from "./pages/UserPage"
import SearchPage from "./pages/HomePage/HomePage"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage title={"New Designs"} />} />
          {/* <Route path="/design/:id" element={<DetailsPage />} /> */}
          {/* <Route path="/profile/:id" element={<UserPage />} /> */}
          <Route path="/:id" element={<SearchPage />} title={"Search"} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
