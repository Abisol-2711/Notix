import '../../styles/variable.css'
import Menu from '../Menu/Menu'
import '../../styles/variable.css'
import { useEffect, useState } from 'react'
import './folder.css'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'

function Folder({ onEdit, onDelete }) {
  const { user } = UserAuth()

  const [folders, setFolders] = useState([])

  useEffect(() => {
    const fetchFolders = async () => {
      if (!user) return

      const { data, error } = await supabaseClient
        .from('folders')
        .select('*')
        .eq('user_id', user.id)

      if (error) console.error('Error al obtener carpetas', error)
      else setFolders(data)
    }

    fetchFolders()
  }, [user])

  return (
    <section className="contentFolders">
      {folders.map((folder) => (
        <div key={folder.idFolder} className="folder">
          <Menu
            onEdit={() => onEdit(folder)}
            onDelete={() => onDelete(folder)}
          />
          <h4 className="titleFolder">{folder.name}</h4>
        </div>
      ))}
    </section>
  )
}

export default Folder
