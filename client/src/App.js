import './styles/global.scss';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import DetailsPage from "./pages/DetailsPage/DetailsPage"
import UserPage from "./pages/UserPage/UserPage"
import SearchPage from "./pages/HomePage/HomePage"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useEffect, useState  } from "react";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // console.log(profile)

  const getUser = async () => {
      const token = sessionStorage.getItem("token");

      try {
          const response = await axios.get("http://localhost:8080/user", {
              headers: { Authorization: `Bearer ${token}` }
          })
          setProfile(response.data)
          setIsLoggedIn(true)
      } catch(error) {
          console.log(error)
          setIsLoggedIn(false)
      }
      setIsLoading(false);
  }

  const logout = () => {
      sessionStorage.removeItem("token");
      setIsLoggedIn(true);
      setProfile(null);
    }; 

    useEffect(() => {
      getUser();
    }, [isLoggedIn]);


  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoading={isLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} profile={profile} />
        <Routes>
          <Route path="/" element={<HomePage title={"New Designs"} />} />
          <Route path="/design/:id" element={<DetailsPage />} />
          <Route path="/profile/:id" element={<UserPage profile={profile} />} />
          <Route path="/:id" element={<SearchPage />} title={"Search"} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
