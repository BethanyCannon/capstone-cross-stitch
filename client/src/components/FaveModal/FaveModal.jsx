import "./FaveModal.scss"
import Modal from "react-modal";

Modal.setAppElement('#root');

function FaveModal({ setIsOpen}) {

    return (
        <div className="fave__background" onClick={() => setIsOpen(false)} >  
                <p className="fave__text">You must be logged in to use this x</p>
        </div>
    )
}

export default FaveModal