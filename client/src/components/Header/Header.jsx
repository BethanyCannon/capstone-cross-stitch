import "./Header.scss";
import stitchLogo from "../../assets/stitch.svg";
import searchIcon from "../../assets/search.svg"
import {Link} from "react-router-dom";
import Login from "../../components/Login/Login";
import { useEffect, useState  } from "react";
import axios from "axios";

function Header() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [failedAuth, setFailedAuth] = useState(false);

    const getUser = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await axios.get("http://localhost:8080/user", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProfile(response.data)
        } catch(error) {
            console.log(error)
            setFailedAuth(true);
        }
        setIsLoading(false);
    }

    // const logout = () => {
    //     sessionStorage.removeItem("token");
    //     setFailedAuth(true);
    //     setProfile(null);
    //   }; 

      useEffect(() => {
        getUser();
      }, []);

      if (isLoading) {
        return (
          <main className="dashboard">
            <h1 className="dashboard__title">Dashboard</h1>
            <p>Loading...</p>
          </main>
        )
      }

    if (failedAuth) {
        return (
            <header>
            <nav className="nav-bar">
                <Link className="nav-bar__link" to="/" >
                <img className="nav-bar__logo" src={stitchLogo} alt="X Stitch Logo" />
                </Link>
                <div className="nav-bar__container">
                    <div className="nav-bar__search-container">
                        <input type="search" placeholder="Search" />
                        <img src={searchIcon} alt="search icon" />
                    </div>
                    <div className="nav-bar__login">
                    <Login />
                    </div>
                </div>
            </nav>
        </header>
        )
      }


    return (
        <header>
            <nav className="nav-bar">
                <Link className="nav-bar__link" to="/" >
                <img className="nav-bar__logo" src={stitchLogo} alt="X Stitch Logo" />
                </Link>
                <div className="nav-bar__container">
                    <div className="nav-bar__search-container">
                        <input type="search" placeholder="Search" />
                        <img src={searchIcon} alt="search icon" />
                    </div>
                    <div className="nav-bar__login">
                    <img src={profile.avatar} className="nav-bar__avatar" />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header