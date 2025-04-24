import { useState } from 'react'
import './menu.css'
import 'material-symbols'

function Menu({ onEdit, onDelete }) {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <span className="material-symbols-rounded iconDots" onClick={handleClick}>
        {' '}
        more_horiz{' '}
      </span>
      <section className={`contentMenu ${isActive ? 'active' : ''}`}>
        <div className="contentEdit" onClick={() => onEdit()}>
          <span className="material-symbols-rounded"> edit_square </span>
          <p className="textEdit">Editar</p>
        </div>
        <div className="contentDelete" onClick={() => onDelete()}>
          <span className="material-symbols-rounded"> delete </span>
          <p className="textDelete">Borrar</p>
        </div>
      </section>
    </>
  )
}

export default Menu
