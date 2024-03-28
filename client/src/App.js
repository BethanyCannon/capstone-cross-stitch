import './styles/global.scss';
import { BrowserRouter, Route, Routes, Navigate, useSearchParams } from "react-router-dom"
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
  const [newDesignsData, setNewDesignsData] = useState(null);
  const [query, setQuery] = useState("")
  const [homeData, setHomeData] = useState("")
  const [searchval, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const [refresh, setRefresh] = useState(false);

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
      setIsLoggedIn(false);
      setProfile(null);
    }; 

    useEffect(() => {
      getUser();
    }, [isLoggedIn]);
  //  setRefresh(false) 
  
    
// console.log(refresh)

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoading={isLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} profile={profile} setRefresh={setRefresh} setNewDesignsData={setNewDesignsData} setQuery={setQuery} setIsSearching={setIsSearching} setSearchValue={setSearchValue} homeData={homeData} />
        <Routes>
          <Route path="/" element={<HomePage refresh={refresh} newDesignsData={newDesignsData} setNewDesignsData={setNewDesignsData} query={query} setHomeData={setHomeData} searchval={searchval} isSearching={isSearching} />} />
          <Route path="/search/:sadness" element={<SearchPage newDesignsData={newDesignsData} setNewDesignsData={setNewDesignsData} />}  />
          <Route path="design/:Did" element={<DetailsPage Pid={profile} searchval={searchval} />} />
          <Route path="profile/:Pid" element={<UserPage profile={profile} logout={logout} />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
