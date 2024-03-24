import "./Login.scss";
import Modal from "react-modal";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";
import axios from "axios";
import SignUp from "../SignUp/SignUp"

Modal.setAppElement('#root');

function Login({setIsLoggedIn}) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email: event.target.email.value,
                password: event.target.password.value
              });
              sessionStorage.setItem("token", response.data.token);
              setIsLoggedIn(true)
              setIsOpen(false)

        } catch(error){
            console.log(error)
            setError(error.response.data);
        }
    }

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
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
                    
                {/* <div className="login"> */}
                    <button className="login__button" onClick={closeModal}> <img src={closeIcon} /> </button>
                    
                    <form className="login__form" onSubmit={handleLogin}>
                    <legend>Login</legend>
                        <label htmlFor="email" > Email: </label>
                            <input type="text" name="email" />
                        <label htmlFor="password" > Password: </label>
                            <input type="password" name="password" />

                        <button>Log in</button>

                        {error && <div className="login__message">{error}</div>}
                    </form>
                    <p>don't have an account?</p>
                    <SignUp />
                {/* </div> */}

            </Modal>
        </div>
    )
}

export default Login