import { useState } from "react";
import "./menu.css";
import 'material-symbols';

function Menu() {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <span className="material-symbols-rounded iconDots" onClick={handleClick}> more_horiz </span>
            <section className={`contentMenu ${isActive ? 'active' : ''}`}>
                <div className="contentEdit">
                    <span className="material-symbols-rounded"> edit_square </span>
                    <p className="textEdit">Editar</p>
                </div>
                <div className="contentDelete">
                    <span className="material-symbols-rounded"> delete </span>
                    <p className="textDelete">Borrar</p>
                </div>
            </section >
        </>
    )
}

export default Menu