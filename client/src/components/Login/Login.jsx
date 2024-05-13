import "./Login.scss";
import Modal from "react-modal";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";
import axios from "axios";
import SignUp from "../SignUp/SignUp"

Modal.setAppElement('#root');

function Login({ setIsLoggedIn }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(false)
        setSuccess(false)

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email: event.target.email.value,
                password: event.target.password.value
            });
            sessionStorage.setItem("token", response.data.token);
            setIsLoggedIn(true)
            setIsOpen(false)

        } catch (error) {
            console.log(error)
            setError(error.response.data);
        }
    }

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
        setError(null)
        setSuccess(null)
    }
    return (
        <div>
            <p onClick={openModal}>Login/Sign up</p>
            <Modal
                contentLabel="Login form"
                className="Modal"
                portalClassNam="login"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}>

                <button className="login__close" onClick={closeModal}> <img src={closeIcon} /> </button>

                <form className="login__form" onSubmit={handleLogin}>
                    <legend className="login__title">Login</legend>

                    <label htmlFor="email" > Email: </label>
                    <input type="text" placeholder="email@email.com" name="email" />

                    <label htmlFor="password" > Password: </label>
                    <input type="password" placeholder="******" name="password" />

                    <button className="login__login-btn">Log in</button>

                    {error && <div className="login__error-message">{error}</div>}
                    {success && <div className="login__success-message"> Your account has been made. Please login </div>}
                </form>

                <div className="login__text">
                <p>Don't have an account?</p>
                <SignUp setSuccess={setSuccess} />
                </div>

            </Modal>
        </div>
    )
}

export default Login