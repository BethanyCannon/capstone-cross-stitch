import "./Header.scss";
import stitchLogo from "../../assets/stitch.svg";
import searchIcon from "../../assets/search.svg"
import {Link} from "react-router-dom";
import Login from "../../components/Login/Login";
import { useEffect, useState  } from "react";
import axios from "axios";

function Header({isLoading, isLoggedIn, setIsLoggedIn, profile }) {
    // const [profile, setProfile] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // console.log(profile)

    // const getUser = async () => {
    //     const token = sessionStorage.getItem("token");

    //     try {
    //         const response = await axios.get("http://localhost:8080/user", {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //         setProfile(response.data)
    //         setIsLoggedIn(true)
    //     } catch(error) {
    //         console.log(error)
    //         setIsLoggedIn(false)
    //     }
    //     setIsLoading(false);
    // }

    // // const logout = () => {
    // //     sessionStorage.removeItem("token");
    // //     setFailedAuth(true);
    // //     setProfile(null);
    // //   }; 

    //   useEffect(() => {
    //     getUser();
    //   }, [isLoggedIn]);

      if (isLoading) {
        return (
          <main>
            <p>Loading...</p>
          </main>
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

                    {!isLoggedIn ?(                    
                    <div className="nav-bar__login">
                    <Login setIsLoggedIn={setIsLoggedIn} />
                    </div>) :
                    (<div>
                        {profile ? 
                        (<Link to={`profile/${profile.id}`}>
                        <img src={`http://localhost:8080/avatars/${profile.avatar}`} className="nav-bar__avatar" />
                        </Link>)  :
                        (<object className="nav-bar__avatar" type="image/jpeg" />)}
                    </div>
                    )
                    }

                </div>
            </nav>
        </header>
    )
}

export default Header