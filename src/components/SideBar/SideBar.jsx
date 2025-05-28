import { NavLink } from 'react-router-dom'
import '../../styles/variable.css'
import 'material-symbols'
import { UserAuth } from '../../context/AuthContext'
import './sidebar.css'

function SideBar() {
  const { signout } = UserAuth()

  return (
    <nav className="nav">
      <div className="contentLinks">
        <NavLink
          to="/"
          className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
        >
          <span className="material-symbols-rounded iconSideBar"> home </span>
          <p className="textLink">Inicio</p>
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
        >
          <span className="material-symbols-rounded iconSideBar">
            {' '}
            calendar_month{' '}
          </span>
          <p className="textLink">Calendario</p>
        </NavLink>
        <NavLink
          to="/trash"
          className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
        >
          <span className="material-symbols-rounded iconSideBar"> delete </span>
          <p className="textLink">Papelera</p>
        </NavLink>
      </div>

      <button className="btnSideBar" onClick={signout}>
        Cerrar sesión
      </button>
    </nav>
  )
}

export default SideBar
