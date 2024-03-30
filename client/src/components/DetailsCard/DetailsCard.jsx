import "./DetailsCard.scss"

function DetailsCard({profile, logout}) {

    const handleLogout = () => {
        logout()
    }

    if(!profile) {
        return <div>loading</div>
    }

    return(
        <section className="details">
            <img src={`http://localhost:8080/avatars/${profile.avatar}`} className="details__avatar" />
            <div className="details__text">
                <p onClick={handleLogout} className="details__logout" >logout</p>
               <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
               <p>
               {profile.email}
                </p>
                <p>
                User since {profile.created_at}
                </p>
               
            </div>
        </section>
    )

}

export default DetailsCard