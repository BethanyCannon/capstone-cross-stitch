import "./SearchPage.scss"
import DesignCard from "../../components/DesignCard/DesignCard";
import { baseURL } from "../../utils"
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function SearchPage () {
    const [searchData, setSearchData] = useState(null)
    
    const {searchTerm} = useParams()

    useEffect(() => {
 
        const getSearch = async () => 
        {
            try {
                console.log(searchTerm)
                const response = await axios.get(`${baseURL}/design/search/${searchTerm}`)
                console.log(response)
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