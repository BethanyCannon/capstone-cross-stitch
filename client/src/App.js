import './styles/global.scss';
import { BrowserRouter, Route, Routes, Navigate, useSearchParams } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import DetailsPage from "./pages/DetailsPage/DetailsPage"
import UserPage from "./pages/UserPage/UserPage"
import SearchPage from "./pages/SearchPage/SearchPage"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useEffect, useState  } from "react";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //check to see if user is logged in; if so return data
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

  //log user out and triggers rerender of getUser
  const logout = () => {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
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
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:searchTerm" element={<SearchPage />}  />
          <Route path="design/:DesignId" element={<DetailsPage Pid={profile} isLoggedIn={isLoggedIn} />} />
          <Route path="profile/:UserId" element={<UserPage profile={profile} logout={logout} setProfile={setProfile} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
