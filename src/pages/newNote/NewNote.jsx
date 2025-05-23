import { useState } from 'react'
import CreateNote from '../../components/CreateNote/CreateNote'
import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import './newNote.css'

function NewNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <section className="newNote">
      <Header />
      <SideBar />
      <h2 className="titleh2">Nueva nota</h2>
      <CreateNote
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
      <section className="contentNewNote">
        <div className="contentNote">
          <h4 className="titleNote" title={title}>
            {' '}
            {title || 'Título de ejemplo'}
          </h4>
          <p className="textNote"> {content || 'Contenido de ejemplo'}</p>
        </div>
      </section>
    </section>
  )
}

export default NewNote
