import { useState } from 'react'
import Note from '../../components/Note/Note'
import 'material-symbols'
import CreateNote from '../../components/CreateNote/CreateNote'
import EditNote from '../../components/EditNote/EditNote'
import { useNavigate } from 'react-router-dom'

function Notes() {
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)

  return (
    <section className="contentFoldersAndAdd">
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
        <Note
          onEdit={(note) => {
            setIsEditing(true)
            setNoteToEdit(note)
          }}
          onView={(note) => navigate(`/notas/${note.idNote}`)}
        />
      )}

      <button className="contentNew" onClick={() => navigate('/nota/nueva')}>
        <span className="material-symbols-rounded iconNew"> note_add </span>
        <p className="titleNew">Nueva nota</p>
      </button>
    </section>
  )
}

export default Notes
