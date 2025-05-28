import { UserAuth } from '../../context/AuthContext'
import getName from '../../utils/getName'
import './profile.css'
import photo from '../../assets/photo.jpg'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user } = UserAuth()
  const name = getName(user)
  const [isActive, setIsActive] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleEdit = () => {
    setIsActive(false)
    navigate('/perfil')
  }

  const handleLogout = () => {
    setIsActive(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false)
      }
    }
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive])

  return (
    <div ref={menuRef} style={{ display: 'inline-block' }}>
      <img
        className="imgProfile"
        src={photo}
        alt="Foto de perfil"
        onClick={handleClick}
      />
      {name ? (
        <p className="greeting">Hola, {name}</p>
      ) : (
        <p className="greeting">Nombre no disponible</p>
      )}
      <section
        className={`contentMenuProfile ${isActive ? 'activeProfile' : ''}`}
      >
        <div className="contentEditProfile" onClick={handleEdit}>
          <span className="material-symbols-rounded"> edit_square </span>
          <p className="textEditProfile">Editar</p>
        </div>
        <div className="contentLogoutProfile" onClick={handleLogout}>
          <span className="material-symbols-rounded"> logout </span>
          <p className="textLogoutProfile">Salir</p>
        </div>
      </section>
    </div>
  )
}

export default Profile
