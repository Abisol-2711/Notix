import { useState } from 'react'
import Note from '../../components/Note/Note'
import 'material-symbols'
import CreateNote from '../../components/CreateNote/CreateNote'
import EditNote from '../../components/EditNote/EditNote'
import { useNavigate } from 'react-router-dom'
import './notes.css'
import { useBreakpoint } from '../../hooks/useBreakpoint'

function Notes() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [notes, setNotes] = useState([])

  const breakpoint = useBreakpoint()
  const folderLimit =
    breakpoint === 'desktop' ? 8 : breakpoint === 'tablet' ? 6 : 4
  const gridListClass = `gridList ${
    notes.length > folderLimit ? 'scrollable foldersMaxHeight' : ''
  }`

  return (
    <section className="contentListContainer">
      {isCreating ? (
        <CreateNote onClose={() => setIsCreating(false)} />
      ) : isEditing ? (
        <EditNote
          note={noteToEdit}
          onClose={() => {
            setIsEditing(false)
            setNoteToEdit(null)
          }}
        />
      ) : (
        <>
          {notes.length === 0 && (
            <p className="noItemsText">Aún no hay notas, agrega una:</p>
          )}
          <div className={gridListClass}>
            <Note
              notes={notes}
              setNotes={setNotes}
              onEdit={(note) => {
                setIsEditing(true)
                setNoteToEdit(note)
              }}
              onView={(note) => navigate(`/notas/${note.idNote}`)}
            />
          </div>

          <button
            className="contentNew"
            onClick={() => navigate('/nota/nueva')}
          >
            <span className="material-symbols-rounded iconNew">note_add</span>
            <p className="titleNew">Nueva nota</p>
          </button>
        </>
      )}
    </section>
  )
}

export default Notes
