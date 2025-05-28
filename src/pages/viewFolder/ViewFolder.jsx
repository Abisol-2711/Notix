import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabaseClient } from '../../supabase/client'

function ViewFolder() {
  const { id } = useParams()
  const [folder, setFolder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFolders = async () => {
      const { data, error } = await supabaseClient
        .from('folders')
        .select('*')
        .eq('idFolder', id)
        .single()
      if (error) {
        setError(error)
      } else {
        setFolder(data)
      }
    }
    fetchFolders()
  }, [id])

  if (error) return <p>Error: {error.message}</p>
  if (!folder) return <p>Cargando...</p>

  return (
    <div>
      <h2>{folder.name}</h2>
    </div>
  )
}

export default ViewFolder
