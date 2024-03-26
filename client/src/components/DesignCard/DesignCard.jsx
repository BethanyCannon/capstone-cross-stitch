import "./DesignCard.scss"

function Card({newDesign}) {

    console.log(newDesign)

 return(
    <div className="design-card">
        <img className="design-card__img" src={newDesign.image.image_url} />
        <div>
            <p>{newDesign.design_name}</p>
            <p>{newDesign.creator_name}</p>
        </div>
    </div>
 )   
}

export default Card;
