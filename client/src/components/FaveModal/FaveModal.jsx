import "./FaveModal.scss"
import Modal from "react-modal";
import likeIcon from "../../assets/heart.svg"
import { useState } from "react";
import closeIcon from "../../assets/close.svg";

Modal.setAppElement('#root');

function FaveModal({ setIsOpen}) {
    // const [modalIsOpen, setIsOpen] = useState(false);

    // function openModal() {
    //     setIsOpen(true);
    // }


    // function closeModal() {
    //     setIsOpen(false);
    // }

    return (
        <div className="fave__background" onClick={() => setIsOpen(false)} >  
                <p className="fave__text">You must be logged in to use this</p>

            {/* </Modal> */}
        </div>
    )
}

export default FaveModal