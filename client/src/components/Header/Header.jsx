import "./Header.scss";
import stitchLogo from "../../assets/stitch.svg";
import searchIcon from "../../assets/search.svg"
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import { useEffect, useState, redirect } from "react";
import axios from "axios";
import { baseURL } from "../../utils"

function Header({ isLoading, isLoggedIn, setIsLoggedIn, profile, setNewDesignsData, setSearchValue, setIsSearching, setRefresh, homeData, setQuery}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault()
    setIsSearching(true)
    const search = event.target.search.value

    searchDesignData(search);

    if (search) {
      setSearchParams({search})
    } 
    event.target.reset();
  }

  setSearchValue(searchParams.get('search'))

  const searchDesignData = async (search) => {
    try {
      const response = await axios.get(`${baseURL}/design/search?s=${search}`
      )
      setNewDesignsData(response.data)
      setSearchValue(search)

    } catch (error) {
      console.log(`${error}`)
    }
  }

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
        <Link className="nav-bar__link" to="/" onClick={() => {setNewDesignsData(homeData)}}  >
          <img className="nav-bar__logo" src={stitchLogo} alt="X Stitch Logo" />
        </Link>
        <div className="nav-bar__container">
          <form className="nav-bar__search-container" onSubmit={submitHandler}>
            <input
              type="search"
              name="search"
              // value={query}
              placeholder="Search"></input>
            <img src={searchIcon} />
          </form>
          {!isLoggedIn ? (
            <div className="nav-bar__login">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </div>) :
            (<div>
              {profile ?
                (<Link to={`profile/${profile.id}`}>
                  <img src={`http://localhost:8080/avatars/${profile.avatar}`} className="nav-bar__avatar" />
                </Link>) :
                (<object className="nav-bar__avatar" type="image/jpeg" />)}
            </div>)
          }
        </div>
      </nav>
    </header>
  )
}

export default Header