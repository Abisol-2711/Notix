import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './register.css'

function Register() {
  const { signUpWithEmail } = UserAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRequirements, setShowRequirements] = useState(false)

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
      setShowRequirements(true)
      return
    }
    setShowRequirements(false)

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
    <div className="contentRegister">
      <form onSubmit={handleSubmit} className="contentRegisterForm">
        <h2 className="titleRegister">Registrarse</h2>
        <div className="contentInputRegister">
          <label htmlFor="name" className="labelRegister">
            Nombre
          </label>
          <input
            type="name"
            id="name"
            placeholder="Juan Carlos"
            className="inputRegister"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="contentInputRegister">
          <label htmlFor="email" className="labelRegister">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="exmple@hotmail.com"
            className="inputRegister"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="contentInputRegister">
          <label htmlFor="password" className="labelRegister">
            Contraseña
            <span
              className="material-symbols-rounded infoIconRegister"
              title="Debe contener mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos."
            >
              info
            </span>
          </label>
          <div className="contentPasswordRegister">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              className="inputPasswordRegister"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handleFocusPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btnRegister"
            >
              <span className="material-symbols-rounded">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
        </div>

        {showRequirements && (
          <div className="contentRequirementsRegister">
            <ul className="listRegister">
              {password.length < 8 && (
                <li className="itemRegisterError">
                  <span className="material-symbols-rounded iconError">
                    warning
                  </span>
                  Al menos 8 caracteres
                </li>
              )}
              {!/[A-Z]/.test(password) && (
                <li className="itemRegisterError">
                  <span className="material-symbols-rounded iconError">
                    warning
                  </span>
                  Al menos una mayúscula
                </li>
              )}
              {!/[0-9]/.test(password) && (
                <li className="itemRegisterError">
                  <span className="material-symbols-rounded iconError">
                    warning
                  </span>
                  Al menos un número
                </li>
              )}
              {!/[^A-Za-z0-9]/.test(password) && (
                <li className="itemRegisterError">
                  <span className="material-symbols-rounded iconError">
                    warning
                  </span>
                  Al menos un símbolo
                </li>
              )}
            </ul>
          </div>
        )}

        <button type="submit" className="btnSubmitRegister">
          Registrarse
        </button>
        <div className="contentNotAccountRegister">
          <p className="textRegister">¿Tenes cuenta?</p>
          <a href="/login" className="linkRegister">
            Inicia sesión
          </a>
        </div>
      </form>
    </div>
  )
}

export default Register
