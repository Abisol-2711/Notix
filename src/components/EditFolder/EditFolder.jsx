import { useEffect, useState } from 'react'
import { supabaseClient } from '../../supabase/client'
import { UserAuth } from '../../context/AuthContext'

function EditFolder({ folder, onClose }) {
  const [name, setName] = useState('')
  const { user } = UserAuth()

  useEffect(() => {
    if (folder) {
      setName(folder.name)
    }
  }, [folder])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name) return

    const { error } = await supabaseClient
      .from('folders')
      .update({
        name: name,
        user_id: user.id,
      })
      .eq('idFolder', folder.idFolder)

    if (error) {
      console.error('Error al editar la carpeta:', error.message)
    } else {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Editar carpeta</h4>
      <label>
        Titulo
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Editar carpeta</button>
      <button type="button" onClick={onClose}>
        Cancelar
      </button>
    </form>
  )
}

export default EditFolder
