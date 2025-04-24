import { useState } from 'react'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'

function CreateFolder({ onClose }) {
  const [name, setName] = useState('')
  const { user } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name) return

    const { error } = await supabaseClient.from('folders').insert([
      {
        name: name,
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Crear carpeta</button>
      <button type="button" onClick={onClose}>
        Cancelar
      </button>
    </form>
  )
}

export default CreateFolder
