import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Register() {
  const { signUpWithEmail } = UserAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const regexLowercase = /[a-z]/g
    const regexUppercase = /[A-Z]/g
    const regexDigits = /[0-9]/g
    const regexSymbols = /[!@#$%^&*(),.?":{}|<>]/g

    return (
      password.length >= 8 &&
      regexLowercase.test(password) &&
      regexUppercase.test(password) &&
      regexDigits.test(password) &&
      regexSymbols.test(password)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar la contraseña
    if (!validatePassword(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos.'
      )
      return
    }

    // Si la contraseña es válida, continuar con el registro
    try {
      await signUpWithEmail(name, email, password)
      Swal.fire({
        title: '¡Éxito!',
        text: 'Te registraste correctamente!',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })
      navigate('/')
    } catch (error) {
      setError(error.message)
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setError('')
  }

  const handleFocusPassword = () => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  return (
    <>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            id="name"
            placeholder="Juan Carlos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
              onChange={handlePasswordChange}
              onFocus={handleFocusPassword}
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

        <div>
          <ul>
            <li>Debe tener al menos 8 caracteres</li>
            <li>Debe incluir al menos una letra mayúscula</li>
            <li>Debe incluir al menos una letra minúscula</li>
            <li>Debe incluir al menos un número</li>
            <li>Debe incluir al menos un símbolo (ej. !, @, #, $, %, etc.)</li>
          </ul>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Registrarse</button>
        <div>
          <p>¿Tenes cuenta?</p>
          <a href="/login">Inicia sesión</a>
        </div>
      </form>
    </>
  )
}

export default Register
