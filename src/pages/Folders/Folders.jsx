import { useState } from 'react'
import Folder from '../../components/Folder/Folder'
import 'material-symbols'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import EditFolder from '../../components/EditFolder/EditFolder'
import './folders.css'

function Folders() {
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
      <button className="contentNewFolder" onClick={() => setIsCreating(true)}>
        <span className="material-symbols-rounded iconNewFolder">
          {' '}
          create_new_folder{' '}
        </span>
        <p className="titleNewFolder">Nueva carpeta</p>
      </button>
    </section>
  )
}

export default Folders
