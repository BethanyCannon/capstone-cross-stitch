import "./Header.scss";
import stitchLogo from "../../assets/stitch.svg";
import searchIcon from "../../assets/search.svg"
import {Link} from "react-router-dom";

function Header() {
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
                    <p>Login</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header