import { UserAuth } from '../../context/AuthContext'
import getName from '../../utils/getName'
import './profile.css'
import photo from '../../assets/photo.jpg'
function Profile() {
  const { user } = UserAuth()
  const name = getName(user)

  return (
    <div>
      <img className="imgProfile" src={photo} alt="Foto de perfil" />
      {name ? (
        <p className="greeting">Hola, {name}</p>
      ) : (
        <p className="greeting">Nombre no disponible</p>
      )}
      <div className="hidden">
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
