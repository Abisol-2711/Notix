import Search from '../Search/Search'
import Profile from '../Profile/Profile'
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/" className='linkHome'>
        <h1 className="title">N</h1>
      </Link>
      <Search />
      <Profile />
    </header>
  )
}

export default Header
