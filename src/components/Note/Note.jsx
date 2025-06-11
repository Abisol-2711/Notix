import '../../styles/variable.css'
import { useEffect, useState } from 'react'
import './note.css'
import Menu from '../Menu/Menu'
import 'material-symbols'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'
import getDateNote from '../../utils/getDateNote'
import confirmDelete from '../../utils/confirmDelete'

function Note({ notes, setNotes, onEdit, onView }) {
  const { user } = UserAuth()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return

      const { data, error } = await supabaseClient
        .from('notes')
        .select('*')
        .eq('user_id', user.id)

      if (error) console.error('Error al obtener notas', error)
      else setNotes(data)
    }

    fetchNotes()
  }, [user])

  const handleDelete = async (note) => {
    const confirmed = await confirmDelete('nota')

    if (!confirmed) return

    const { error } = await supabaseClient
      .from('notes')
      .delete()
      .eq('idNote', note.idNote)

    if (error) {
      console.error('Error al eliminar nota:', error.message)
    } else {
      setNotes((prevNotes) => prevNotes.filter((n) => n.idNote !== note.idNote))
    }
  }

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.idNote}
          className="contentNote"
          onClick={() => onView(note)}
        >
          <Menu
            onEdit={() => onEdit(note)}
            onDelete={() => handleDelete(note)}
          />

          <h4 className="titleNote" title={note.title}>
            {' '}
            {note.title}
          </h4>
          <p className="textNote"> {note.content}</p>
          <hr className="dividerNote" />
          <div className="contentDate">
            <span className="material-symbols-rounded iconCalendar">
              {' '}
              calendar_month{' '}
            </span>
            <p className="dateNote"> {getDateNote(note.created_at)}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default Note
