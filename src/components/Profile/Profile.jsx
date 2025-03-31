import { UserAuth } from '../../context/AuthContext'
import getName from '../../utils/getName'
import './profile.css'

function Profile() {
  const { user } = UserAuth()
  const name = getName(user)

  return (
    <div>
      <img src="" alt="" />
      {name ? <p>Hola, {name}</p> : <p>Nombre no disponible</p>}
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
