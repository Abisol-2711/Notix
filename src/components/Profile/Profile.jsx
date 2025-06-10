import { UserAuth } from '../../context/AuthContext'
import { supabaseClient } from '../../supabase/client'
import getName from '../../utils/getName'
import './profile.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, signout } = UserAuth()
  const name = getName(user)
  const [isActive, setIsActive] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!user) return

      const { data, error } = await supabaseClient
        .from('photoUser')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Error al obtener foto de perfil', error)
        setPhoto(null) // <- importante para evitar string vacío
      } else {
        setPhoto(data?.url ?? null) // <- importante
      }
    }

    fetchPhoto()
  }, [user])

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleEdit = () => {
    setIsActive(false)
    navigate('/perfil')
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
      <div className="contentImg">
        {photo && (
          <img
            className="imgProfile"
            src={photo}
            alt="Foto de perfil"
            onClick={handleClick}
          />
        )}

        {name ? (
          <p className="greeting">Hola, {name}</p>
        ) : (
          <p className="greeting">Nombre no disponible</p>
        )}
      </div>
      <section
        className={`contentMenuProfile ${isActive ? 'activeProfile' : ''}`}
      >
        <div className="contentEditProfile" onClick={handleEdit}>
          <span className="material-symbols-rounded"> edit_square </span>
          <p className="textEditProfile">Editar</p>
        </div>
        <div className="contentLogoutProfile" onClick={signout}>
          <span className="material-symbols-rounded"> logout </span>
          <p className="textLogoutProfile">Salir</p>
        </div>
      </section>
    </div>
  )
}

export default Profile
