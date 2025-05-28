import SideBar from '../../components/SideBar/SideBar'
import Header from '../../components/Header/Header'
import './calendar.css'
import '../../styles/variable.css'

function Calendar() {
  return (
    <div className="contentCalendar">
      <Header className="header" />
      <SideBar className="sidebar" />
      <menu className="menuCalendar">
        <h3 className="titleCalendar">Proximamente</h3>
      </menu>
    </div>
  )
}

export default Calendar
