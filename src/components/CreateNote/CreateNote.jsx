import { useState } from 'react'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'

function CreateNote({ onClose }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { user } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !content) return

    const { error } = await supabaseClient.from('notes').insert([
      {
        title: title,
        content: content,
        user_id: user.id,
      },
    ])

    if (error) {
      console.error('Error al crear la nota:', error.message)
    } else {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Crear nota</h4>
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

export default CreateNote
