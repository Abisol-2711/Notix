import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Calendar from '../pages/Calendar/Calendar'
import Trash from '../pages/Trash/Trash'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRouter
