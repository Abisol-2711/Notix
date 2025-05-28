import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import './trash.css'
import '../../styles/variable.css'

function Trash() {
  return (
    <div className="contentTrash">
      <Header className="header" />
      <SideBar className="sidebar" />
      <menu className="menuTrash">
        <h3 className="titleTrash">Proximamente</h3>
      </menu>
    </div>
  )
}

export default Trash
