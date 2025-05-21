import Search from '../Search/Search'
import Profile from '../Profile/Profile'
import './header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="title">N</h1>
      <Search />
      <Profile />
    </header>
  )
}

export default Header
