import { createContext, useContext, useEffect, useState } from 'react'
import { supabaseClient } from '../supabase/client.js'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState([])

  // const checkAndInsertPhotoUser = async (user) => {
  //   if (!user) return

  //   const { data: existing, error } = await supabaseClient
  //     .from('photoUser')
  //     .select('id')
  //     .eq('user_id', user.id)
  //     .maybeSingle()

  //   if (!existing && !error) {
  //     const defaultUrl =
  //       'https://xriutyuefwcaqyixxcqj.supabase.co/storage/v1/object/public/photos-profile/default/img_dafault.jpg'

  //     const displayName =
  //       user.user_metadata?.display_name || user.user_metadata?.name

  //     const { error: insertError } = await supabaseClient
  //       .from('photoUser')
  //       .insert({
  //         user_id: user.id,
  //         url: defaultUrl,
  //         display_name: displayName,
  //       })

  //     if (insertError) {
  //       console.error('❌ Error al insertar en photoUser:', insertError.message)
  //     } else {
  //       console.log('✅ Usuario insertado en photoUser')
  //     }
  //   }
  // }

  const checkAndInsertPhotoUser = async (user, displayName) => {
    if (!user) return

    const { data: existing, error } = await supabaseClient
      .from('photoUser')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!existing && !error) {
      const defaultUrl =
        'https://xriutyuefwcaqyixxcqj.supabase.co/storage/v1/object/public/photos-profile/default/img_dafault.jpg'

      const nameToUse =
        displayName ||
        user.user_metadata?.display_name ||
        user.user_metadata?.name

      console.log('✅ Nombre usado en photoUser:', nameToUse)

      const { error: insertError } = await supabaseClient
        .from('photoUser')
        .insert({
          user_id: user.id,
          url: defaultUrl,
          display_name: nameToUse,
        })

      if (insertError) {
        console.error('❌ Error al insertar en photoUser:', insertError.message)
      } else {
        console.log('✅ Usuario insertado en photoUser')
      }
    }
  }

  useEffect(() => {
    let alreadyChecked = false

    const getSessionAndListen = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession()
      const currentUser = session?.user || null
      setUser(currentUser)

      if (currentUser && !alreadyChecked) {
        alreadyChecked = true
        await checkAndInsertPhotoUser(currentUser)
      }

      const { data: listener } = supabaseClient.auth.onAuthStateChange(
        async (event, session) => {
          const currentUser = session?.user || null
          setUser(currentUser)

          if (currentUser && !alreadyChecked) {
            alreadyChecked = true
            await checkAndInsertPhotoUser(currentUser)
          }

          const currentPath = window.location.pathname
          if (session) {
            if (currentPath === '/login' || currentPath === '/register') {
              navigate('/')
            }
          } else {
            if (currentPath !== '/login' && currentPath !== '/register') {
              navigate('/login', { replace: true })
            }
          }
        }
      )

      return () => {
        listener?.subscription?.unsubscribe()
      }
    }

    getSessionAndListen()
  }, [navigate])

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

      const user = data.user

      if (user) {
        const { error: metadataError } = await supabaseClient.auth.updateUser({
          data: { display_name: name },
        })

        if (metadataError) {
          console.error(
            '❌ Error al actualizar user_metadata:',
            metadataError.message
          )
        } else {
          console.log('✅ display_name guardado en user_metadata')
        }
        await checkAndInsertPhotoUser({
          ...user,
          user_metadata: { display_name: name },
        })
      }

      return data
    } catch (error) {
      console.error('❌ Error en el registro:', error.message)
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
