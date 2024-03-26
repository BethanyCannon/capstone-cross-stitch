import "./DetailsPage.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import {baseURL} from "../../utils"
import axios from "axios"

function DetailsPage() {
    const {id} = useParams()

    const getDesignDetails = async () => {
        try{
            const response = await axios.get(`${baseURL}/design.${id}`)
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        DetailsPage();
    }, []);

    return(
    <div>Hello World</div>
    )
}

export default DetailsPage