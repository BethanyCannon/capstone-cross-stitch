import "./DetailsPage.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import {baseURL} from "../../utils"
import axios from "axios"

function DetailsPage() {
    const {id} = useParams()
    const [designDetails, setDesignDetails] = useState(null)

    const getDesignDetails = async () => {
        const token = sessionStorage.getItem("token");

        try{
            const response = await axios.get(`${baseURL}/design/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            setDesignDetails(response.data[0])
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

    console.log(designDetails)

    return(
    <div>
        <h2>{designDetails.design_name}</h2>
        {/* <div className="design-details__images"> */}
        {designDetails.image.map((pic) => {
            console.log(pic)
            return(
                <div>
                    <img src={pic.image_url} className="design-details__images" />
                </div>
            )
        })}
        <div>
            {designDetails.created_at}
            {designDetails.creator_name}
            {designDetails.description}
            {designDetails.height_size}
            {designDetails.height_width}
            {designDetails.thread_count}
        </div>
    {/* </div> */}
    </div>
    )
}

export default DetailsPage