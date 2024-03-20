import "./Header.scss";
import stitchLogo from "../../assets/stitch.svg";
import searchIcon from "../../assets/search.svg"

function Header() {
    return (
        <header>
            <nav className="nav-bar">
                <img className="nav-bar__logo" src={stitchLogo} alt="X Stitch Logo" />
                <div className="nav-bar__container">
                    <div className="nav-bar__search-container">
                        <input type="search" placeholder="Search" />
                        <img src={searchIcon} alt="search icon" />
                    </div>
                    <p>Login</p>
                </div>
            </nav>
        </header>
    )
}

export default Header