import { useEffect, useState } from 'react'
import './profile.css'
import photo from '../../assets/photo.jpg'
import Header from '../../components/Header/Header'
import { UserAuth } from '../../context/AuthContext'
import { supabaseClient } from '../../supabase/client'
import Swal from 'sweetalert2'

function Profile() {
  const { user } = UserAuth()
  const [img, setImg] = useState(null)
  const [preview, setPreview] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setName(user.user_metadata.display_name || user.user_metadata.name)
      setEmail(user.email || '')

      // console.log(user)

      const { data, error } = await supabaseClient
        .from('photoUser')
        .select('url')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.warn('No se encontró foto personalizada, se usará por defecto')
        setPreview(photo)
      } else {
        setPreview(data.url || photo)
      }
    }

    fetchData()
  }, [user])

  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImg(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let imgUrl = null

      // 1. Subir imagen si hay
      if (img) {
        const { error: uploadError } = await supabaseClient.storage
          .from('photos-profile')
          .upload(`profile_${user.id}`, img, { upsert: true })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabaseClient.storage
          .from('photos-profile')
          .getPublicUrl(`profile_${user.id}`)

        imgUrl = publicUrlData.publicUrl
        setPreview(imgUrl)
      }

      // 2. Actualizar auth.users
      const { error: authError } = await supabaseClient.auth.updateUser({
        data: {
          display_name: name,
        },
      })
      if (authError) throw authError

      // 3. Actualizar o insertar en photoUser
      const { data: existingPhoto, error: fetchError } = await supabaseClient
        .from('photoUser')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

      if (existingPhoto) {
        const { error: updateError } = await supabaseClient
          .from('photoUser')
          .update({
            ...(imgUrl && { url: imgUrl }),
            display_name: name,
          })
          .eq('user_id', user.id)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabaseClient
          .from('photoUser')
          .insert({
            user_id: user.id,
            url: imgUrl,
            display_name: name,
          })

        if (insertError) throw insertError
      }

      // 4. Cambiar contraseña si se ingresó una
      if (password) {
        const { error: passwordError } = await supabaseClient.auth.updateUser({
          password,
        })
        if (passwordError) throw passwordError
      }

      Swal.fire({
        title: '¡Éxito!',
        text: 'Perfil actualizado correctamente!',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    }

    setPassword('')
  }

  return (
    <div className="contentFormProfile">
      <Header />
      <form onSubmit={handleSubmit} className="contentFormBtnsProfile">
        <div className="contentInputProfile">
          <p className="labelProfile">Foto de perfil</p>
          <div className="profileImgWrapper">
            <img
              src={preview || photo}
              alt="Foto de perfil"
              className="imgFormProfile"
            />
            <label htmlFor="img" className="editImgBtn">
              <span className="material-symbols-rounded">edit</span>
            </label>
          </div>
          <input
            type="file"
            id="img"
            className="inputProfile"
            accept="image/*"
            onChange={handleImgChange}
          />
        </div>
        <div className="contentInputProfile">
          <label htmlFor="name" className="labelProfile">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            placeholder="Carlos Rodez"
            className="inputProfile"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="contentInputProfile">
          <label htmlFor="email" className="labelProfile">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@hotmail.com"
            className="inputProfile"
            value={email}
            readOnly
          />
        </div>
        <div className="contentInputProfile">
          <label htmlFor="password" className="labelProfile">
            Contraseña
          </label>
          <div className="contentPasswordProfile">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              className="inputPasswordProfile"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btnProfile"
            >
              <span className="material-symbols-rounded">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
        </div>
        <button type="submit" className="btnSubmitProfile">
          Editar Perfil
        </button>
      </form>
    </div>
  )
}

export default Profile
