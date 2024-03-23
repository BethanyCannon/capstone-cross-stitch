import "./Login.scss";
import Modal from "react-modal";
import { useState } from "react";
import closeIcon from "../../assets/close.svg";
import axios from "axios";

Modal.setAppElement('#root');

function Login() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(
            "email", event.target.email.value,
            "password", event.target.password.value)

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email: event.target.email.value,
                password: event.target.password.value
              });

              console.log(response)
              sessionStorage.setItem("token", response.data.token);
              setIsOpen(false)

        } catch(error){
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
                    <h2>Login</h2>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <label htmlFor="email" > Email: </label>
                            <input type="text" name="email" />
                        <label htmlFor="password" > Password: </label>
                            <input type="password" name="password" />

                        <button>Log in</button>

                        {error && <div className="login__message">{error}</div>}
                    </form>
                    <p>Sign up</p>
                {/* </div> */}

            </Modal>
        </div>
    )
}

export default Login