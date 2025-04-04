import { Link } from 'react-router'
import '../../styles/variable.css'
import 'material-symbols'
import { UserAuth } from '../../context/AuthContext'
import './sidebar.css'

function SideBar() {
  const { signout } = UserAuth()

  return (
    <nav className='nav'>
      <div className='contentLinks'>
        <Link to="/" className="link">
          <span className="material-symbols-rounded"> home </span>
          Inicio
        </Link>
        <Link to="/calendar" className="link">
          <span className="material-symbols-rounded"> calendar_month </span>
          Calendario
        </Link>
        <Link to="/trash" className="link">
          <span className="material-symbols-rounded"> delete </span>
          Papelara
        </Link>
      </div>

      <button onClick={signout}>Cerrar sesión</button>
    </nav>
  )
}

export default SideBar
