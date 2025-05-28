import '../../styles/variable.css'
import Menu from '../Menu/Menu'
import '../../styles/variable.css'
import { useEffect, useState } from 'react'
import './folder.css'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'
import confirmDelete from '../../utils/confirmDelete'

function Folder({ onEdit, onView }) {
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

  const handleDelete = async (folder) => {
    const confirmed = await confirmDelete('carpeta')

    if (!confirmed) return

    const { error } = await supabaseClient
      .from('folders')
      .delete()
      .eq('idFolder', folder.idFolder)

    if (error) {
      console.error('Error al eliminar carpeta:', error.message)
    } else {
      setFolders((prevFolders) =>
        prevFolders.filter((f) => f.idFolder !== folder.idFolder)
      )
    }
  }

  return (
    <>
      {folders.map((folder) => (
        <div
          key={folder.idFolder}
          className="contentFolder"
          onClick={() => onView(folder)}
        >
          <div className="folderTab"></div>
          <div className="folderCard">
            <Menu
              onEdit={() => onEdit(folder)}
              onDelete={() => handleDelete(folder)}
            />
            <h4 className="folderTitle" title={folder.name}>
              {folder.name}
            </h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default Folder
