import "./LeaderBoard.Styled.ts";
import playersData from "./playersData.json";
import {CustomTable, CustomTd, CustomTh, HeadDiv} from "./LeaderBoard.Styled.ts";

function LeaderBoard() {

    function createTable() {
        return (
            <CustomTable>
                <thead>
                <tr>
                    <CustomTh className="contents">Player Name</CustomTh>
                    <CustomTh className="contents">Player Score</CustomTh>
                </tr>
                </thead>
                <tbody>
                {playersData.map((player, index) => (
                    <tr key={index}>
                        <CustomTd>{player.name}</CustomTd>
                        <CustomTd>{player.score}</CustomTd>
                    </tr>
                ))}
                </tbody>
            </CustomTable>
        );
    }

    return (
        <div>
            <HeadDiv>{createTable()}</HeadDiv>
        </div>
    );
}

export default LeaderBoard;
