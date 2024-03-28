import DesignCard from "../../components/DesignCard/DesignCard";
import { baseURL } from "../../utils"
import "./HomePage.scss";
import axios from "axios";
import { useState, useEffect, useParams } from "react";

function HomePage({ title, setNewDesignsData, newDesignsData, refresh, query, setRefresh, setHomeData, searchval }) {

    // const {sadness} = useParams()
    // console.log(sadness)

    // if (!searchval) {
    //     try {
    //         const data = await axios.get(`${baseURL}/design`)
    //         setNewDesignsData(data.data)
    //         setHomeData(data.data)
    //     } catch (error) {
    //         console.log(`${error}`)
    //     }
    // } else {
    //     try {
    //         const response = await axios.get(`${baseURL}/design/search?s=${searchval}`
    //         )
    //         setNewDesignsData(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
// }

useEffect(() => {
    const getDesignData = async () => {

        // if (searchval) {
        //     try {
        //         const response = await axios.get(`${baseURL}/design/search?s=${searchval}`
        //         )
        //         setNewDesignsData(response.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        if (!searchval) {
            try {
                const data = await axios.get(`${baseURL}/design`)
                setNewDesignsData(data.data)
            } catch (error) {
                console.log(`${error}`)
            }
        }
    }
        getDesignData()
    }, [searchval])

    useEffect(() => {
        console.log(searchval)
        const getSearch = async () => 
        {
            if (searchval) {
            try {
                const response = await axios.get(`${baseURL}/design/search?s=${searchval}`
                )
                setNewDesignsData(response.data)
            } catch (error) {
                console.log(error)
            }
        }}
        getSearch()
    }, [searchval])

if (!newDesignsData) {
    return (
        <div>
            Loading...
        </div>
    )
}

title = newDesignsData[0].title || "new designs"

return (
    <section className="home-page">
        <h1 className="home-page__title">{title}</h1>
        <div className="home-page__card-container">
            {newDesignsData.map((newDesign, index) => {
                return (
                    <DesignCard
                        key={index}
                        newDesign={newDesign}
                    />
                )
            }
            )}
        </div>
    </section>
)
}

export default HomePage