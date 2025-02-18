import "../../styles/variable.css";
import { useEffect, useState } from "react";
import notes from "../../utils/notes.json"
import "./note.css";
import Menu from "../Menu/Menu";
import 'material-symbols';

function Note() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const mockData = notes.data;

        setTimeout(() => {
            setData(mockData);
        }, 1000);
    }, []);

    return (
        <section className="contentNotes">
            {data.map((note) => (
                <div key={note.id} className="note">
                    <Menu />
                    <h4 className="titleNote"> {note.title}</h4>
                    <p className="contentNote"> {note.content}</p>
                    <hr className="dividerNote" />
                    <div className="contentDate">
                        <span className="material-symbols-rounded iconCalendar"> calendar_month </span>
                        <p className="dateNote"> {note.date}</p>
                    </div>
                </div>
            ))}
        </section >
    )
}

export default Note
