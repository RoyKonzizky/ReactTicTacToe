import "./App.css";
import {Link} from "react-router-dom";
import smallPC from "../assets/smallPC.jpg";
import fightImg from "../assets/fightImg.webp";

function App() {
    return (
        <div className={"main"}>
            <div className={"main"}>
                <Link className={"links"} to="/pvpmenu">
                    <img className={"images"} src={fightImg} alt="PvP"/>
                </Link>
            </div>

            <div className={"main"}>
                <Link className={"links"} to="/cpumenu">
                    <img className={"images"} src={smallPC} alt="PvPC"/>
                </Link>
            </div>
        </div>
    );
}

export default App;
