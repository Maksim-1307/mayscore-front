import { useEffect } from "react";

function Leagueslist (props) {
    let data  = props.data;

    if (!data) return;

    function sort_leagues(dataArray) {

        const priorityIDs = {
            "198_dYlOSQOD": 0,
            "77_KIShoMk3": 0,
            "81_MNEDyOlF": 0,
            "176_QVmLl54o": 0,
            "98_COuk57Ci": 0,
            "139_Or1bBrWD": 0,
            "145_GOvB22xg": 0,
            "155_UmMRoGzp": 0,
            "158_YacqHHdS": 5,
            "6_ClDjv3V5": 2,
            "6_xGrwqq16": 2
        };
        const priorityCountries = ['Англия', 'Испания', 'Россия', 'Италия', 'Франция', 'Германия', 'Европа'];

        function check_country(league) {
            if (league && league.country && priorityCountries.includes(league.country)) return true;
            return false;
        }
        function check_id(league) {
            if (league && league.id && priorityIDs[league.id] != undefined) return +priorityIDs[league.id];
            return -1;
        } 
        dataArray.sort((a, b) => {
            //if (!(a && b)) return 0;
            const leagueA = a[0];
            const leagueB = b[0];
            // console.log("league A", leagueA);
            // console.log("league B", leagueB);
            if (check_id(leagueA) > check_id(leagueB)) return -1;
            if (check_id(leagueA) < check_id(leagueB)) return 1;
            if (check_country(leagueA)) return -1;
            if (check_country(leagueB)) return 1;
            return 0;
        });
        console.log(dataArray);
        return dataArray;
    }

    function group_data(dataArray) {
        let content = [];
        let leagueData = [];
        dataArray.forEach(block => {
            if (block && block.blockType == "league") {
                content.push(leagueData);
                leagueData = [];
            }
            leagueData.push(block);

        });
        content.push(leagueData);
        return content;
    }

    let elements = [];
    data = sort_leagues(group_data(data)); 
    data.forEach(league => {
        if (league && league[0] && league[0].blockType == "league") {
            let block = league[0];
            elements.push(
            <a href={block.url} class="sidebar__point">
                <img class="sidebar__icon" src={block.icon} alt="" />
                <span>{block.name}</span>
            </a>);
        }
    });
    return (
        <>{elements}</>
    );
}

export default Leagueslist;