import "./DetailsPage.scss"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { baseURL } from "../../utils"
import axios from "axios"
import Carousel from "react-multi-carousel";
import Like from "../../components/Like/Like";
import backIcon from "../../assets/back-arrow.svg";
import likeIcon from "../../assets/heart.svg"
import FaveModal from "../../components/FaveModal/FaveModal"

function DetailsPage({ Pid, isLoggedIn }) {
    const { Did } = useParams()
    const [designDetails, setDesignDetails] = useState(null)
    const [heroImage, setHeroImage] = useState()
    const [isFavourite, setIsFavourite] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const getDesignDetails = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await axios.get(`${baseURL}/design/details/${Did}`, {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            setDesignDetails(response.data[0])
            setHeroImage(response.data[0].image[0].image_url)
            setIsFavourite(response.data[0].favourites)
            setIsOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDesignDetails();
    }, [isFavourite, isLoggedIn]);

    if (!designDetails) {
        return <div>Loading...</div>
    }

    const addFavourite = async () => {
        await axios.post(`${baseURL}/user/${Pid.id}/favourites/${Did}`)
        setIsFavourite(true)
    }

    const deleteFavourite = async () => {
        await axios.delete(`${baseURL}/user/${Pid.id}/favourites/${Did}`)
        setIsFavourite(false)
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

    const date = new Date(`${designDetails.created_at}`)
    const convertedDate = date.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" })

    const handleImage = (event) => {
        setHeroImage(event.target.src)
    }

    return (
        <div className="design-details">
            <div className="design-details__header-container">
                <img src={backIcon} className="design-details__design-btn" onClick={() => { navigate(-1) }} />
                <h2 className="design-details__title">{designDetails.design_name}</h2>
            </div>
            <div className="design-details__container">
                <div className="design-details__img-container" >
                    <img src={heroImage} className="design-details__hero-image" />
                    <Carousel
                        containerClass={{
                            borderBottom: '1px solid black',
                            backgroundColor: "lightblue",
                        }}
                        responsive={responsive}
                        className="design-details__carousel"
                        infinite={false} >
                        {designDetails.image.map((pic) => {
                            return (
                                <img className="design-details__images"
                                    src={pic.image_url}
                                    key={pic.id}
                                    onClick={handleImage}
                                />
                            )
                        })}
                    </Carousel>
                </div>
                <div className="design-details__modal-container">
                    {isOpen && <FaveModal setIsOpen={setIsOpen} />}
                    <div className="design-details__text-container" >
                        {designDetails.favourites === null ? <div className="design-details__svg-container" onClick={() => setIsOpen(true)}> <img src={likeIcon} />    </div> :
                            <div className="design-details__svg-container" > {designDetails.favourites === true ? <div onClick={deleteFavourite} className="design-details__svg" ><Like color="red" /></div> : <div className="design-details__svg" onClick={addFavourite}><Like /></div>} </div>}
                        <div className="design-details__text-title">
                            <p>Creator </p>
                            <p>Published</p>
                            <p>Size</p>
                            <p>Thread Count</p>
                            <p>Description</p>
                        </div>
                        <div className="design-details__text">
                        <p>{designDetails.creator_name} </p>
                        <p>{convertedDate}</p>
                        <p>{designDetails.size_height}cm x {designDetails.size_width}cm</p>
                        <p>{designDetails.thread_count} colours</p>
                        <p>{designDetails.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPage