import "./Header.scss";
import stitchLogo from "../../assets/stitch.svg";
import searchIcon from "../../assets/search.svg"
import { Link, useNavigate, } from "react-router-dom";
import Login from "../../components/Login/Login";


function Header({ isLoading, isLoggedIn, setIsLoggedIn, profile}) {
  const navigate = useNavigate()

  //get search bar data and navigate to searhc page
  const submitHandler = (event) => {
    event.preventDefault()
    const search = event.target.search.value
    navigate(`search/${search}`)
    event.target.reset();
  }


  if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  //displays different html is isLoggedIn is true or not
  return (
    <header>
      <nav className="nav-bar">
        <Link className="nav-bar__link" to="/"   >
          <img className="nav-bar__logo" src={stitchLogo} alt="X Stitch Logo" />
        </Link>
        <div className="nav-bar__container">
          <form className="nav-bar__search-container" onSubmit={submitHandler}>
            <input  type="search"  name="search"  placeholder="Search"></input>
            <button><img src={searchIcon} /></button>
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