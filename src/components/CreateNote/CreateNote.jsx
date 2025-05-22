import { useState } from 'react'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'

function CreateNote({ onClose, title, setTitle, content, setContent }) {
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
    <form onSubmit={handleSubmit} className="formNote">
      <label className="labelNote">
        Titulo
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="inputNote"
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
      <div className="contentBtns">
        <button type="submit" className="btnCreate">
          Crear
        </button>
        <button type="button" className="btnCancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default CreateNote
