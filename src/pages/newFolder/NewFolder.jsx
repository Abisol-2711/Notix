import { useState } from 'react'
import CreateFolder from '../../components/CreateFolder/CreateFolder'
import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import './newFolder.css'

function NewFolder() {
  const [title, setTitle] = useState('')

  return (
    <section className="newFolder">
      <Header />
      <SideBar />
      <h2 className="titleh2">Crear una nueva carpeta</h2>
      <CreateFolder title={title} setTitle={setTitle} />
      <section className="contentNewFolder">
        <div className="contentFolder">
          <div className="folderTab"></div>
          <div className="folderCard">
            <h4 className="folderTitle" title={title}>
              {title || 'Título de ejemplo'}
            </h4>
          </div>
        </div>
      </section>
    </section>
  )
}

export default NewFolder
