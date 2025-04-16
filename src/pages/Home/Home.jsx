import Notes from '../Notes/Notes'
import Folders from '../Folders/Folders'
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import './home.css'
import '../../styles/variable.css'

function Home() {
  return (
    <div className="content">
      <Header className="header" />
      <SideBar className="sideber" />
      <menu className="menu">
        <Notes />
        <Folders />
      </menu>
    </div>
  )
}

export default Home
