import "./DetailsCard.scss";
import EditUser from "../EditUser/EditUser";
import DeleteUser from "../DeleteUser/DeleteUser";


function DetailsCard({ profile, logout, setProfile, setIsLoggedIn }) {

    //sql date conversion
    const date = new Date(`${profile.created_at}`)
    const convertedDate = date.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" })

    //function that triggers App.js logout
    const handleLogout = () => {
        logout()
    }

    if (!profile) {
        return <div>loading</div>
    }

    return (
        <section className="details">

            <div className="details__container">
                <img src={`http://localhost:8080/avatars/${profile.avatar}`} className="details__avatar" />
                <div className="details__text-container">
                    <div className="details__text" >
                        <div className="details__btn-container-desktop">
                            <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
                            <p onClick={handleLogout} className="details__logout"> logout</p>
                            <div className="details__modals">
                                <EditUser setProfile={setProfile} profile={profile} />
                                <DeleteUser profile={profile} setIsLoggedIn={setIsLoggedIn} />
                            </div>
                        </div>

                        <h2 className="details__title-mobile">{`${profile.first_name} ${profile.last_name}`}</h2>

                        <p>
                            {profile.email}
                        </p>
                        <p>
                            User since {convertedDate}
                        </p>
                    </div>
                </div>
            </div>
            <div className="details__btn-container-mobile">
                <p onClick={handleLogout} className="details__logout"> logout</p>
                <div className="details__modals">
                    <EditUser setProfile={setProfile} profile={profile} />
                    <DeleteUser profile={profile} setIsLoggedIn={setIsLoggedIn} />
                </div>
            </div>
        </section>
    )

}

export default DetailsCard