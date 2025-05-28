import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Calendar from '../pages/Calendar/Calendar'
import Trash from '../pages/Trash/Trash'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import PrivateRoute from './PrivateRoute'
import NewFolder from '../pages/newFolder/NewFolder'
import NewNote from '../pages/newNote/NewNote'
import ViewFolder from '../pages/viewFolder/ViewFolder'
import ViewNote from '../pages/viewNote/ViewNote'

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/carpeta/nueva"
        element={<NewFolder onClose={() => window.history.back()} />}
      />
      <Route
        path="/nota/nueva"
        element={<NewNote onClose={() => window.history.back()} />}
      />
      <Route
        path="/carpetas/:id"
        element={<ViewFolder onClose={() => window.history.back()} />}
      />
      <Route
        path="/notas/:id"
        element={<ViewNote onClose={() => window.history.back()} />}
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        }
      />
      <Route
        path="/trash"
        element={
          <PrivateRoute>
            <Trash />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
