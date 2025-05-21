import { Link } from 'react-router'
import '../../styles/variable.css'
import 'material-symbols'
import { UserAuth } from '../../context/AuthContext'
import './sidebar.css'

function SideBar() {
  const { signout } = UserAuth()

  return (
    <nav className="nav">
      <div className="contentLinks">
        <Link to="/" className="link">
          <span className="material-symbols-rounded iconSideBar"> home </span>
          <p className="textLink">Inicio</p>
        </Link>
        <Link to="/calendar" className="link">
          <span className="material-symbols-rounded iconSideBar">
            {' '}
            calendar_month{' '}
          </span>
          <p className="textLink">Calendario</p>
        </Link>
        <Link to="/trash" className="link">
          <span className="material-symbols-rounded iconSideBar"> delete </span>
          <p className="textLink">Papelera</p>
        </Link>
      </div>

      <button className="btnSideBar" onClick={signout}>
        Cerrar sesión
      </button>
    </nav>
  )
}

export default SideBar
