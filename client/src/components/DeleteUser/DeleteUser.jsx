import Modal from "react-modal";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function DeleteUser({setIsLoggedIn}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const {Pid} = useParams();
    const navigate = useNavigate()
    // console.log(params)
    //setProfile

    const handleDelete = () => {
        const deleteUser = async () => {
            const response = await axios.delete(`http://localhost:8080/user/${Pid}`)
            sessionStorage.removeItem("token")
            navigate("/")
            setIsLoggedIn(false)
            console.log(response)
        }
        deleteUser()
    }

    return (
        <div>
            <p onClick={() => setIsOpen(true)}>Delete</p>
            <Modal
                contentLabel="Edit form"
                className="Modal"
                portalClassNam="edit"
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}>

                <button className="login__close" onClick={() => setIsOpen(false)}> <img src={closeIcon} /> </button>

                <h2>Delete account</h2>
                <p>Are you sure you want to delete? This cannon be undone</p>

                <button onClick={() => setIsOpen(false)}> Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </Modal>
        </div>
    )
}

export default DeleteUser