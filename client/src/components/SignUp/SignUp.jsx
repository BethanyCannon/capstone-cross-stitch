import "./SignUp.scss"
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

Modal.setAppElement('#root');

function SignUp() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            //   console.log(response)
        } catch(error){
            console.log(error)
            setError(error.response.data);
        }
    }

    const handleFile = (event) => {
        setFile(event.target.files[0])
    }

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <p onClick={openModal}>Sign up</p>
            <Modal
                contentLabel="Login form"
                className="Modal"
                portalClassNam="login"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}>
                <form className="login__form" onSubmit={handleSubmit}>
                <legend>Sign up</legend>

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
                    <input type="file" name="avatar" onChange={handleFile} accept="image/png, image/jpeg" />

                    <button 
                    // onClick={handleUpload}
                    >Create account</button>

                    {error && <div className="login__message">{error}</div>}
                </form>
            </Modal>
        </div>
    )
}

export default SignUp