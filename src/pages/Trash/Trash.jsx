import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import './trash.css'
import '../../styles/variable.css'

function Trash() {
  return (
    <div className="content">
      <Header className="header" />
      <SideBar className="sideber" />
      <menu className="menu">
        <h3>Papelera</h3>
      </menu>
    </div>
  )
}

export default Trash
