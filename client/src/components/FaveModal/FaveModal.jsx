import "./FaveModal.scss"
import Modal from "react-modal";
import closeIcon from "../../assets/close.svg"

Modal.setAppElement('#root');

function FaveModal({ setIsOpen}) {

    return (
        <div className="fave__background" onClick={() => setIsOpen(false)} >  
                <p className="fave__text">You must be logged in to use this  <img src={closeIcon} /> </p>
        </div>
    )
}

export default FaveModal