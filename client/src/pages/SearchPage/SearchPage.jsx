import "./SearchPage.scss"
import DesignCard from "../../components/DesignCard/DesignCard";
import { baseURL } from "../../utils"
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function SearchPage () {
    const [searchData, setSearchData] = useState(null)
    const {searchTerm} = useParams()

    //function to collect search input and send to api
    //set variab'e to display search page with results
    useEffect(() => {
        const getSearch = async () => 
        {
            try {
                const response = await axios.get(`${baseURL}/design/search/${searchTerm}`)
                setSearchData(response.data)
            } catch (error) {
                console.log(error)
            }
    }
        getSearch()
    }, [searchTerm])

if (!searchData) {
    return (
        <div>
            Loading...
        </div>
    )
}

    return (
    <section className="home-page">
        <h1 className="home-page__title">Search: {searchTerm}</h1>
        <div className="home-page__card-container">
            {searchData.map((search, index) => {
                return (
                    <DesignCard
                        key={index}
                        newDesign={search}
                    />
                )
            }
            )}
        </div>
    </section>
)
}

export default SearchPage