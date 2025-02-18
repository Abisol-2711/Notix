import Menu from "../Menu/Menu"
import "../../styles/variable.css";
import { useEffect, useState } from "react";
import folders from "../../utils/folders.json"
import "./folder.css";

function Folder() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const mockData = folders.data;

        setTimeout(() => {
            setData(mockData);
        }, 1000);
    })

    return (
        <section className="contentFolders">
            {data.map((folder) => (
                <div key={folder.id} className="folder">
                    <Menu />
                    <h4 className="titleFolder">{folder.title}</h4>
                </div>
            ))}
        </section>
    )
}

export default Folder