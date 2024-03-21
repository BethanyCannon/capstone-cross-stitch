import DesignCard from "../../components/DesignCard/DesignCard";
import "./HomePage.scss";
import axios from "axios";
import { useState } from "react";

function HomePage({title}) {
    const [newDesignsData, setNewDesignsData] = useState(null)

    return(
        <section className="home-page">
            <h1 className="home-page__title">{title}</h1>
            <DesignCard />
        </section>
    )
}

export default HomePage