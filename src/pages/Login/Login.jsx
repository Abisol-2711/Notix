import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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
    <>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="exmple@hotmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '78%',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {showPassword ? '🙈' : '👁️'}{' '}
            </button>
          </div>
        </div>
        <button type="submit">Iniciar sesión</button>
        <div>
          <p>¿No tenes cuenta?</p>
          <a href="/register">Registrate</a>
        </div>
      </form>
      <button onClick={signInWithGoogle}>Iniciar con Google</button>
      {/* <button onClick={signInWithFacebook}>Iniciar con Facebook</button> */}
    </>
  )
}

export default Login
