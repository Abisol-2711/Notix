import { createContext, useContext, useEffect, useState } from 'react'
import { supabaseClient } from '../supabase/client.js'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser()
      setUser(user)
    }

    fetchUser()

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => listener?.subscription?.unsubscribe()
  }, [])

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
      })

      if (error) throw new Error('A ocurrido un error durante la autenticación')

      return data
    } catch (error) {
      console.error(error.message)
    }
  }

  // async function signInWithFacebook() {
  //   try {
  //     const { data, error } = await supabaseClient.auth.signInWithOAuth({
  //       provider: 'facebook',
  //     })

  //     if (error)
  //       throw new Error('Ha ocurrido un error durante la autenticación')

  //     return data
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }

  async function signUpWithEmail(name, email, password) {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      })

      if (error) throw new Error(error.message)

      if (data?.user) {
        const { error: updateError } = await supabaseClient.auth.updateUser({
          data: { display_name: name },
        })

        if (updateError) {
          console.error(
            'Error al actualizar display name:',
            updateError.message
          )
        } else {
          console.log('Display name actualizado correctamente')
        }
      }

      return data
    } catch (error) {
      console.error(error.message)
    }
  }

  async function signInWithEmail(email, password) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw new Error(error.message)
      return data
    } catch (error) {
      console.error(error.message)
    }
  }

  async function signout() {
    try {
      const { error } = await supabaseClient.auth.signOut()
      if (error)
        throw new Error('A ocurrido un error durante el cierre de sesión')
      setUser(null)
      navigate('/login', { replace: true })
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)

        if (session) {
          navigate('/')
        } else {
          const currentPath = window.location.pathname
          if (currentPath !== '/login' && currentPath !== '/register') {
            navigate('/login', { replace: true })
          }
        }
      }
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [navigate])

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
