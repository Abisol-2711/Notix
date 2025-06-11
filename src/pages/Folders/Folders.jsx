import { useState } from 'react'
import Folder from '../../components/Folder/Folder'
import 'material-symbols'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import EditFolder from '../../components/EditFolder/EditFolder'
import { useNavigate } from 'react-router-dom'
import './folders.css'
import { useBreakpoint } from '../../hooks/useBreakpoint'

function Folders() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [folderToEdit, setFolderToEdit] = useState(null)
  const [folders, setFolders] = useState([])

  const breakpoint = useBreakpoint()
  const folderLimit =
    breakpoint === 'desktop' ? 8 : breakpoint === 'tablet' ? 6 : 4
  const gridListClass = `gridList ${
    folders.length > folderLimit ? 'scrollable foldersMaxHeight' : ''
  }`

  return (
    <section className="contentListContainer">
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
        <>
          {folders.length === 0 && (
            <p className="noItemsText">Aún no hay carpetas, agrega una:</p>
          )}
          <div className={gridListClass}>
            <Folder
              folders={folders}
              setFolders={setFolders}
              onEdit={(folder) => {
                setIsEditing(true)
                setFolderToEdit(folder)
              }}
              onView={(folder) => navigate(`/carpetas/${folder.idFolder}`)}
            />
          </div>

          <button
            className="contentNew"
            onClick={() => navigate('/carpeta/nueva')}
          >
            <span className="material-symbols-rounded iconNew">
              create_new_folder
            </span>
            <p className="titleNew">Nueva carpeta</p>
          </button>
        </>
      )}
    </section>
  )
}

export default Folders
