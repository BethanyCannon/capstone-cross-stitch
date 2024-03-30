import "./EditUser.scss";
import Modal from "react-modal";
import editIcon from "../../assets/edit.svg";
import closeIcon from "../../assets/close.svg"
import { useState } from "react";
import {baseURL} from "../../utils";
import axios from "axios";

Modal.setAppElement('#root');

function EditUser({profile, setProfile}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(profile.avatar)
    const [selectedProfile, setSelectedProfile] = useState({
        id: profile.id,
        avatar: file,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        password: "Password",
        confirmPassword: "Password",
      });

    //   console.log("p", profile)
    //   console.log("s", selectedProfile.avatar)

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("avatar", file)
        data.append("id", profile.id)        
        data.append("first_name", selectedProfile.firstName)
        data.append("last_name", selectedProfile.lastName)
        data.append("email", selectedProfile.email)
        data.append("password", selectedProfile.password)
        data.append("confirm_password", selectedProfile.confirmPassword)

        const editUser = async () => {
            try{
               const response = await axios.patch(`${baseURL}/user/${profile.id}`, data)
               console.log("r", response.data)
               setProfile(response.data)
               setSelectedProfile({...selectedProfile, avatar: response.data.avatar})
               setIsOpen(false)
            }catch(error){
                console.log(error)
            }
        }
        editUser()
    }

    // console.log(file)

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
                    <legend className="sign-up__title">Edit</legend>

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
                    <img className="edit__avatar" src={`http://localhost:8080/avatars/${selectedProfile.avatar}`} />
                    <input type="file" name="edit_avatar" className="sign-up__avatar-upload" onChange={handleFile}  accept="image/png, image/jpeg" />

                    <button className="sign-up__submit-btn">Update Account</button>
                    <button onClick={() => setIsOpen(false)} type="button">Cancel</button>
                </form>

            </Modal>
        </div>
    )

}

export default EditUser;