import { useState } from 'react'
import Folder from '../../components/Folder/Folder'
import 'material-symbols'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import EditFolder from '../../components/EditFolder/EditFolder'
import './folders.css'
import { useNavigate } from 'react-router-dom'

function Folders() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [folderToEdit, setFolderToEdit] = useState(null)

  return (
    <section className="contentFoldersAndAdd">
      {isCreating ? (
        <CreateFolder onClose={() => setIsCreating(false)} />
      ) : isEditing ? (
        <EditFolder
          folder={folderToEdit}
          onClose={() => {
            setIsEditing(false)
            setFolderToEdit(null)
          }}
        />
      ) : (
        <Folder
          onEdit={(folder) => {
            setIsEditing(true)
            setFolderToEdit(folder)
          }}
        />
      )}
      <button className="contentNew" onClick={() => navigate('/carpeta/nueva')}>
        <span className="material-symbols-rounded iconNew">
          {' '}
          create_new_folder{' '}
        </span>
        <p className="titleNew">Nueva carpeta</p>
      </button>
    </section>
  )
}

export default Folders
