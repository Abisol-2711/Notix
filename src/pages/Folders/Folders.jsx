import { useState } from 'react'
import Folder from '../../components/Folder/Folder'
import 'material-symbols'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import EditFolder from '../../components/EditFolder/EditFolder'

function Folders() {
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [folderToEdit, setFolderToEdit] = useState(null)

  return (
    <>
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
      <button onClick={() => setIsCreating(true)}>
        <span className="material-symbols-rounded"> description </span>
        <p>Nueva carpeta</p>
      </button>
    </>
  )
}

export default Folders
