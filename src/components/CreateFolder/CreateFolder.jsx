import { useState } from 'react'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'
import './createFolder.css'

function CreateFolder({ onClose, title, setTitle }) {
  const { user } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) return

    const { error } = await supabaseClient.from('folders').insert([
      {
        name: title,
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
    <form onSubmit={handleSubmit} className="formFolder">
      <label className="labelFolder">
        Nombre de la carpeta
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="inputFolder"
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

export default CreateFolder
