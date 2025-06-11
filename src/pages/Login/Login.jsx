import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './login.css'

function Login() {
  const { signInWithGoogle, signInWithEmail } = UserAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await signInWithEmail(email, password)

      if (!user) {
        Swal.fire({
          title: 'Error',
          text: 'Email o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
      }

      if (user) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Iniciaste sesión correctamente!',
          icon: 'success',
          confirmButtonText: 'Cerrar',
        })
        navigate('/')
        console.log(user)
      }
    } catch (error) {
      console.error(error.message)
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    }
  }

  return (
    <div className="contentForm">
      <div className="contentFormContainer">
        <form onSubmit={handleSubmit} className="formLogin">
          <h2 className="formTitle">Iniciar sesión</h2>
          <div className="contentInput ">
            <label htmlFor="email" className="labelField ">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="exmple@hotmail.com"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="contentInput">
            <label htmlFor="password" className="labelField ">
              Contraseña
            </label>
            <div className="contentPassword">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="********"
                className="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btnIcon"
              >
                <span className="material-symbols-rounded">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>
          <button type="submit" className="btnSubmit">
            Iniciar sesión
          </button>
        </form>

        <hr className="lineLogin" />

        <button onClick={signInWithGoogle} className="btnGoogleLogin">
          Iniciar con Google
        </button>
        {/* <button onClick={signInWithFacebook}>Iniciar con Facebook</button> */}

        <div className="contentNotAccount">
          <p className="textInfo">¿No tenes cuenta?</p>
          <a href="/register" className="linkAction">
            Registrate
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
