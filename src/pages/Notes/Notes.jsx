import { useState } from 'react'
import Note from '../../components/Note/Note'
import 'material-symbols'
import CreateNote from '../../components/CreateNote/CreateNote'
import EditNote from '../../components/EditNote/EditNote'

function Notes() {
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)

  return (
    <>
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
        />
      )}

      <button onClick={() => setIsCreating(true)}>
        <span className="material-symbols-rounded"> description </span>
        <p>Nueva nota</p>
      </button>
    </>
  )
}

export default Notes
