import "./EditUser.scss";
import Modal from "react-modal";
import editIcon from "../../assets/edit.svg";
import closeIcon from "../../assets/close.svg"
import { useState } from "react";

Modal.setAppElement('#root');

function EditUser({profile}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);

    const [selectedProfile, setSelectedProfile] = useState({
        id: profile.id,
        image: profile.avatar,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        password: "Password",
        confirmPassword: "Password",
      });

    const [file, setFile] = useState(selectedProfile.avatar)

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleFile = (event) => {
        setFile(event.target.files[0])
    }

    const onChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const newFormData = { ...selectedProfile};
        newFormData[fieldName] = fieldValue;
        console.log(newFormData)
        setSelectedProfile(newFormData)
    }

    return(
        <div>
            <img src={editIcon} onClick={() => setIsOpen(true)} className="details__logout" />
            <Modal
                contentLabel="Edit form"
                className="Modal"
                portalClassNam="edit"
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}>

                <button className="edit__close" onClick={() => setIsOpen(false)}> <img src={closeIcon} /> </button>

                <form className="sign-up__form" onSubmit={handleSubmit}>
                    <legend className="sign-up__title">Sign up</legend>

                    {error && <div className="sign-up__error-message">{error}</div>}

                    <label htmlFor="first-name" > First Name: </label>
                    <input type="text" name="firstName" value={selectedProfile.firstName} onChange={onChange} />

                    <label htmlFor="last-name" > Last Name: </label>
                    <input type="text" name="lastName" value={selectedProfile.lastName} onChange={onChange} />

                    <label htmlFor="email" > Email: </label>
                    <input type="text" name="email" value={selectedProfile.email} onChange={onChange} />

                    <label htmlFor="password" > Password: </label>
                    <input type="password" name="password" value={selectedProfile.password} onChange={onChange} />

                    <label htmlFor="password" > Comfirm Password: </label>
                    <input type="password" name="confirmPassword" value={selectedProfile.confirmPassword} onChange={onChange} />

                    <label htmlFor="avatar">Choose a profile picture:</label>
                    <input type="file" name="avatar" className="sign-up__avatar-upload" onChange={handleFile}  accept="image/png, image/jpeg" />

                    <button className="sign-up__submit-btn">Update Account</button>
                </form>

            </Modal>
        </div>
    )

}

export default EditUser;