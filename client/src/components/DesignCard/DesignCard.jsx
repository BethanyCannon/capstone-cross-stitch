import "./DesignCard.scss"

function Card() {

 return(
    <div className="design-card">
        {/* <img src="" /> */}
        <object className="design-card__img"/>
        <div>
            <p>Title</p>
            <p>Creator</p>
        </div>
    </div>
 )   
}

export default Card;