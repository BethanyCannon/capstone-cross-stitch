import "./Login.scss";
import Modal from "react-modal";
import { useState } from "react";
import closeIcon from "../../assets/close.svg"

function Login() {
    const [modalIsOpen, setIsOpen] = useState(false);

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
                    <form className="login__form">
                        <label> Email:
                            <input />
                        </label>
                        <label> Password:
                            <input type="password" />
                        </label>
                    </form>
                    <p>Sign up</p>
                {/* </div> */}

            </Modal>
        </div>
    )
}

export default Login