import "./SignUp.scss"
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import closeIcon from "../../assets/close.svg"

Modal.setAppElement('#root');

function SignUp({ setSuccess }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false)

        const data = new FormData();
        data.append("image", file)
        data.append("first_name", event.target.firstName.value)
        data.append("last_name", event.target.lastName.value)
        data.append("email", event.target.email.value)
        data.append("password", event.target.password.value)
        data.append("confirm_password", event.target.confirmPassword.value)

        try {
            const response = await axios.post("http://localhost:8080/user/newuser", data
            );
            console.log(response)
            setSuccess(true)
            setIsOpen(false)
        } catch (error) {
            console.log("error", error)
            setError(error.response.data);
        }
    }

    const handleFile = (event) => {
        setFile(event.target.files[0])
    }

    console.log(file)

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <p onClick={openModal} className="sign-up__modal-btn">Sign up</p>
            <Modal
                contentLabel="sign up form"
                className="Modal"
                portalClassNam="sign-up"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}>

                <button className="sign-up__close" onClick={closeModal}> <img src={closeIcon} /> </button>
                
                <form className="sign-up__form" onSubmit={handleSubmit}>
                    <legend className="sign-up__title">Sign up</legend>

                    {error && <div className="sign-up__error-message">{error}</div>}

                    <label htmlFor="first-name" > First Name: </label>
                    <input type="text" name="firstName" />

                    <label htmlFor="last-name" > Last Name: </label>
                    <input type="text" name="lastName" />

                    <label htmlFor="email" > Email: </label>
                    <input type="text" name="email" />

                    <label htmlFor="password" > Password: </label>
                    <input type="password" name="password" />

                    <label htmlFor="password" > Comfirm Password: </label>
                    <input type="password" name="confirmPassword" />

                    <label htmlFor="avatar">Choose a profile picture:</label>
                    <input type="file" name="avatar" className="sign-up__avatar-upload" onChange={handleFile} accept="image/png, image/jpeg" />

                    <button className="sign-up__submit-btn">Create account</button>
                </form>
            </Modal>
        </div>
    )
}

export default SignUp