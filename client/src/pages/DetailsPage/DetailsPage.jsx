import "./DetailsPage.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import {baseURL} from "../../utils"
import axios from "axios"
import Carousel from "react-multi-carousel";
import heartIcon from "../../assets/heart.svg"

function DetailsPage() {
    const {id} = useParams()
    const [designDetails, setDesignDetails] = useState(null)
    const [heroImage, setHeroImage] = useState()

    const getDesignDetails = async () => {
        const token = sessionStorage.getItem("token");

        try{
            const response = await axios.get(`${baseURL}/design/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            setDesignDetails(response.data[0])
            setHeroImage(response.data[0].image[0].image_url)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getDesignDetails();
    }, []);

    if (!designDetails) {
        return <div>Loading...</div>
    }

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
    
    const handleImage = (event) => {
        setHeroImage(event.target.src)
    }

    console.log(heroImage)

    return(
    <div>
        <h2 className="design-details__title">{designDetails.design_name}</h2>
        <div className="design-details">
            <div>
            <img src={heroImage} className="design-details__hero-image" />
        <Carousel
                responsive={responsive}
                className="design-details__carousel"
                infinite={false} >
        {designDetails.image.map((pic) => {
            return(
                    <img className="design-details__images"
                    src={pic.image_url} 
                    key={pic.id} 
                    onClick={handleImage}
                    />
            )
        })}
        </Carousel>
        </div>
        <div className="design-details__text" >
        <p>{designDetails.created_at}</p>
        <p>{designDetails.creator_name}</p>
        <p>{designDetails.height_size} x {designDetails.height_width}</p>
        <p>{designDetails.thread_count}</p>
        <p>{designDetails.description}</p>
        {/* <img src={heartIcon} /> */}
        <svg><g>{heartIcon}</g></svg>

            {designDetails.favourites === null ? <div> you must be logged in for this </div> :
                <div> {designDetails.favourites ? "liked" : "not" } </div>}
        </div>
    </div>
    </div>
    )
}

export default DetailsPage