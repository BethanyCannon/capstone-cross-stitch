import "./UserPage.scss"
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import DesignCard from "../../components/DesignCard/DesignCard";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function HomePage({ profile, logout }) {
    const { Pid } = useParams();
    const [favourites, setFavourites] = useState(null);
    const navigate = useNavigate()

    const getFavourties = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/${Pid}`)
            setFavourites(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
            getFavourties();
    }, []);

    // const handleLogout = () => {
    //     logout()
    // }

    //react-multi-carousel
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    if (!favourites) {
        return <div>Loading...</div>
    }

    if (!profile) {
        return(<div className="profile profile__logout">
            <h2 className="profile__logout-title">You must be logged in to see this page</h2>
            <Link to="/" className="profile__logout-link">
            Click here to return Home
            </Link>
        </div>)
    } 

    return (
        <div className="profile">
            <DetailsCard profile={profile} logout={logout} />
            <h3>You have {favourites.length} favourite items</h3>
            <Carousel
                responsive={responsive}
                className="profile__carousel"
                infinite={false} >
                {favourites.map((favourite) => {
                    return (
                        <DesignCard
                            key={favourite.id}
                            newDesign={favourite}
                        />
                    )
                }
                )}
            </Carousel>
        </div>
    )
}

export default HomePage