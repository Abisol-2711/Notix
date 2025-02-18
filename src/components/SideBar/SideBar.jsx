import { Link } from "react-router"
import "../../styles/variable.css";
import 'material-symbols';

function SideBar() {
    return (
        <nav>
            <Link to="/" className="link">
                <span className="material-symbols-rounded"> home </span>
                Inicio
            </Link>
            <Link to="/calendar" className="link">
                <span className="material-symbols-rounded"> calendar_month </span>
                Calendario
            </Link>
            <Link to="/trash" className="link">
                <span className="material-symbols-rounded"> delete </span>
                Papelara
            </Link>
        </nav>
    )
}

export default SideBar
