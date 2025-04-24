import { useEffect, useState } from 'react'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'

function EditNote({ note, onClose }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { user } = UserAuth()

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !content) return

    const { error } = await supabaseClient
      .from('notes')
      .update({
        title: title,
        content: content,
        user_id: user.id,
      })
      .eq('idNote', note.idNote)

    if (error) {
      console.error('Error al editar la nota:', error.message)
    } else {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Editar nota</h4>
      <label>
        Titulo
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Contenido
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">Guardar nota</button>
      <button type="button" onClick={onClose}>
        Cancelar
      </button>
    </form>
  )
}

export default EditNote
