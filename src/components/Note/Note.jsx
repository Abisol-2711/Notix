import '../../styles/variable.css'
import { useEffect, useState } from 'react'
import './note.css'
import Menu from '../Menu/Menu'
import 'material-symbols'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'
import getDateNote from '../../utils/getDateNote'

function Note({ onEdit, onDelete }) {
  const { user } = UserAuth()

  const [notes, setNotes] = useState([])

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

  return (
    <section className="contentNotes">
      {notes.map((note) => (
        <div key={note.idNote} className="note">
          <Menu onEdit={() => onEdit(note)} onDelete={() => onDelete(note)} />
          <h4 className="titleNote"> {note.title}</h4>
          <p className="contentNote"> {note.content}</p>
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
    </section>
  )
}

export default Note
