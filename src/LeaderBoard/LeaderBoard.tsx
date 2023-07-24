import "./LeaderBoard.css"
import "./LeaderBoard.Styled.ts"

// import {useEffect, useState} from "react";

function LeaderBoard() {
    // const [playersData, setPlayersData] = useState(null);

    // useEffect(() => {
    //     // Fetch the players data from the JSON file
    //     fetch("./playersData.json")
    //         .then((response) => response.json())
    //         .then((data) => setPlayersData(data))
    //         .catch((error) => console.error("Error fetching players data:", error));
    // }, []);

    function createTable() {
        return (
            <table>
                <thead>
                <tr>
                    <th className="contents">Player Name</th>
                    <th className="contents">Player Score</th>
                </tr>
                </thead>
                {/*{Object.entries(playersData).map(([playerId, player]) => (*/}
                {/*    <tr key={playerId}>*/}
                {/*        <td>{player.name}</td>*/}
                {/*        <td>{player.score}</td>*/}
                {/*    </tr>*/}
                {/*))}*/}
            </table>
        );
    }

    return (
        <div>
            <div className={"headDiv"}>{createTable()}</div>
        </div>
    );
}

export default LeaderBoard;
