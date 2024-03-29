import DesignCard from "../../components/DesignCard/DesignCard";
import { baseURL } from "../../utils"
import "./HomePage.scss";
import axios from "axios";
import { useState, useEffect, useParams } from "react";

function HomePage() {

    const [newDesignsData, setNewDesignsData] = useState(null);

useEffect(() => {
    const getDesignData = async () => {
            try {
                const data = await axios.get(`${baseURL}/design`)
                setNewDesignsData(data.data)
            } catch (error) {
                console.log(`${error}`)
            }
    }
        getDesignData()
    }, [])

if (!newDesignsData) {
    return (
        <div>
            Loading...
        </div>
    )
}


return (
    <section className="home-page">
        <h1 className="home-page__title">New Designs</h1>
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