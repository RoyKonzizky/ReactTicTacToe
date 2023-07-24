import {Link} from "react-router-dom";
import {GameModes, Image, Main, ScoreDiv} from "./App.Styles.ts";
import smallPC from "../assets/smallPC.jpg";
import fightImg from "../assets/FightImg.webp";
import podiumImg from "../assets/podiumImg.png";

function App() {
    return (
        <Main>
            <GameModes>
                <Link className={"links"} to="/pvpmenu">
                    <Image className={"images"} src={fightImg} alt="PvP"/>
                </Link>

                <Link className={"links"} to="/cpumenu">
                    <Image className={"images"} src={smallPC} alt="PvPC"/>
                </Link>
            </GameModes>

            <ScoreDiv>
                <Link to={"/leaderboard"}>
                    <Image className={"images"} src={podiumImg} alt="Leaderboard"/>
                </Link>
            </ScoreDiv>
        </Main>
    );
}

export default App;
