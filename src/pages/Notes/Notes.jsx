import Note from "../../components/Note/Note"
import 'material-symbols';

function Notes() {
    return (
        <>
            <Note />
            <button>
                <span className="material-symbols-rounded"> description </span>
                <p>Nueva nota</p>
            </button>
        </>
    )
}

export default Notes