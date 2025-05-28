import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabaseClient } from '../../supabase/client'

function ViewNote() {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabaseClient
        .from('notes')
        .select('*')
        .eq('idNote', id)
        .single()
      if (error) {
        setError(error)
      } else {
        setNote(data)
      }
    }
    fetchNotes()
  }, [id])

  if (error) return <p>Error: {error.message}</p>
  if (!note) return <p>Cargando...</p>

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  )
}

export default ViewNote
