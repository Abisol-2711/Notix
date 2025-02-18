import Folder from "../../components/Folder/Folder"
import 'material-symbols';

function Folders() {
    return (
        <>
            <Folder />
            <button>
                <span className="material-symbols-rounded"> folder </span>
                <p>Nueva carpeta</p>
            </button>
        </>
    )
}

export default Folders