import Modal from "react-modal";
import "./DeleteUser.scss";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";
import deleteIcon from "../../assets/delete.svg"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function DeleteUser({ setIsLoggedIn }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { UserId } = useParams();
    const navigate = useNavigate()

    //function to delete user account (and corresponding favourited items in Favouraites table)
    const handleDelete = () => {
        const deleteUser = async () => {
            const response = await axios.delete(`http://localhost:8080/user/${UserId}`)
            //removes token and navigates them to home page
            sessionStorage.removeItem("token")
            navigate("/")
            setIsLoggedIn(false)
        }
        deleteUser()
    }

    return (
        <div>
            <img onClick={() => setIsOpen(true)} className="delete__delete-icon" src={deleteIcon} />
                <Modal
                    contentLabel="Edit form"
                    className="Modal"
                    portalClassNam="delete"
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}>

                    <button className="delete__close" onClick={() => setIsOpen(false)}> <img src={closeIcon} /> </button>

                    <h2 className="delete__title">Delete account</h2>
                    <p className="delete__text">Are you sure you want to delete? This cannon be undone</p>
                    <div>
                        <button className="delete__cancel-btn" onClick={() => setIsOpen(false)}> Cancel</button>
                        <button className="delete__delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </Modal>
        </div>
    )
}

export default DeleteUser