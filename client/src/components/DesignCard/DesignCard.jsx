import "./DesignCard.scss"
import {Link} from "react-router-dom";


function Card({newDesign}) {

 return(
    <Link to={`design/${newDesign.id}`} className="design-card__link" >
    <div className="design-card">
        <img className="design-card__img" src={newDesign.image.image_url} />
        <div>
            <p>{newDesign.design_name}</p>
            <p>{newDesign.creator_name}</p>
        </div>
    </div>
    </Link>
 )   
}

export default Card;
