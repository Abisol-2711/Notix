import Notes from "../Notes/Notes";
import Folders from "../Folders/Folders";
import SideBar from "../../components/SideBar/SideBar"
import "./home.css";
import "../../styles/variable.css";


function Home() {
    return (
        <menu className="menu">
            <SideBar />
            <Notes />
            <Folders />
        </menu>
    )
}

export default Home