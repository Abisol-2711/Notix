import './profile.css'

function Profile() {
    const userName = localStorage.getItem('user.email');
    console.log(userName);

    return (
        <div>
            <img src="" alt="" />
            <p>{userName || 'Nombre no disponible'}</p>
            <div className='hidden'>
                <div>
                    <i>add icon</i>
                    <p>Options</p>
                </div>
                <div>
                    <i>add icon</i>
                    <p>Log out</p>
                </div>
            </div>
        </div>
    )
}

export default Profile