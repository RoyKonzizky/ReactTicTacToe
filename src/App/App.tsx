import {Link} from "react-router-dom";
import {Image, Main} from "./App.Styles.ts";
import smallPC from "../assets/smallPC.jpg";
import fightImg from "../assets/fightImg.webp";

function App() {
    return (
        <Main>
            <Link className={"links"} to="/pvpmenu">
                <Image className={"images"} src={fightImg} alt="PvP"/>
            </Link>

            <Link className={"links"} to="/cpumenu">
                <Image className={"images"} src={smallPC} alt="PvPC"/>
            </Link>
        </Main>
    );
}

export default App;
