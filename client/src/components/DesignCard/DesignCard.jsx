import "./DesignCard.scss"

function Card({newDesign}) {
    console.log(newDesign.image[0].image_url)

 return(
    <div className="design-card">
        <img className="design-card__img" src={newDesign.image[0].image_url} />
        <div>
            <p>{newDesign.design_name}</p>
            <p>{newDesign.creator_name}</p>
        </div>
    </div>
 )   
}

export default Card;
