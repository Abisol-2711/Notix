import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import './calendar.css'
import '../../styles/variable.css'

function Calendar() {
  return (
    <div className="content">
      <Header className="header" />
      <SideBar className="sideber" />
      <menu className="menu">
        <h3>Calendario</h3>
      </menu>
    </div>
  )
}

export default Calendar
