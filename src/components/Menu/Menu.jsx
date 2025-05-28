import { useState, useEffect, useRef } from 'react'
import './menu.css'
import 'material-symbols'

function Menu({ onEdit, onDelete }) {
  const [isActive, setIsActive] = useState(false)
  const menuRef = useRef(null)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false)
      }
    }
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive])

  return (
    <div ref={menuRef} style={{ display: 'inline-block' }}>
      <span
        className="material-symbols-rounded iconDots"
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
      >
        {' '}
        more_horiz{' '}
      </span>
      <section className={`contentMenu ${isActive ? 'active' : ''}`}>
        <div
          className="contentEdit"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <span className="material-symbols-rounded"> edit_square </span>
          <p className="textEdit">Editar</p>
        </div>
        <div
          className="contentDelete"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <span className="material-symbols-rounded"> delete </span>
          <p className="textDelete">Borrar</p>
        </div>
      </section>
    </div>
  )
}

export default Menu
