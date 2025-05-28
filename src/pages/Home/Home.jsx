import Notes from '../Notes/Notes'
import Folders from '../Folders/Folders'
import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import './home.css'
import '../../styles/variable.css'

function Home() {
  return (
    <div className="contentHome">
      <Header className="header" />
      <SideBar className="sidebar" />
      <menu className="menuHome">
        <Folders />
        <Notes />
      </menu>
    </div>
  )
}

export default Home
