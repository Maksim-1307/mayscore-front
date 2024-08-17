import { useState, createContext, useContext } from "react";
import MatchCard from "./MatchCard";
import { useEffect } from "react";
import "../scripts/closing-list.js";

import arrowIcon from "../images/icons/arrow.svg";
import { ClosingList, ClosingListBody, ClosingListButton } from "./ClosingList.jsx";
import DateInput from "./DateInput.jsx";

function Scoreboard(props) {

    const data = props.data;
    const { filter, setFilter } = useScoreboard();

    function check_filter (match) {
        if (!match) return false;
        const status = match.status;
        switch (filter) {
            case "all": 
                return true;
                break;
            case "live":
                if (["42", "2", "12", "13", "6", "7", "38", "46", "10", "11", "43"].includes(status)){
                    return true
                }
                break;
            case "schedule":
                if (status == 1) return true;
                break;
            case "completed":
                if (status == 3) return true;
                break;
        }
    }

    function navButtons () {
        const buttonsData = {
            "все": "all",
            "live": "live",
            "рассписание":"schedule",
            "завершенные": "completed"
        }
        let buttons = [];
        Object.entries(buttonsData).forEach(([name, func]) => {
            let classname = "button-1 nav-buttons__button";
            if (func == filter) classname += " nav-buttons__button--active";
            const btn = (
                <button onClick={() => { setFilter(func) }}
                    class={classname}>{name}
                </button>
            );
            buttons.push(btn);
        });
        return (
        <div class="nav-buttons">
            {buttons}
        </div>);
    }

    function renderMatches(data) {
        function renderLeague(leagueData){

            const matches = () => {
                let matches = [];
                leagueData.map((block) => {
                    if (check_filter(block)){
                        matches.push (<>
                            <MatchCard data={block} />
                            <div class="match-delmiter"></div>
                        </>)
                    }
                });
                return matches;
            }

            if (!leagueData[0]) return;

            if (matches().length){ return (
                <ClosingList className="matches__closing-list">
                    <div class="closing-list__top matches__league">
                        <div class="matches__league-title">
                                <img class="matches__icon" src={leagueData[0].icon} />
                                <span class="matches__country">{leagueData[0].country}:</span>
                            <a href={leagueData[0]["url"]} class="matches__league-name">{leagueData[0].name}</a>
                        </div>
                        <ClosingListButton>
                            <img src={arrowIcon} />
                        </ClosingListButton>
                    </div>
                    <ClosingListBody>
                        {matches()}    
                    </ClosingListBody>
                </ClosingList>
                );
            } 
        }
        let content = [];
        data = group_data(data);
        data = sort_data(data);
        data.forEach(leagueData => {
            content.push(renderLeague(leagueData));
        });

        content = content.filter(element => element !== undefined);

        if (content.length) return content;
        return (
            <div className="matches__no-data">нет матчей</div>
        );
    }

    function group_data(dataArray){
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


    function sort_data(dataArray) {
        //let priorityIDs = ["6_100_SW9D1eZo", "6_128_Mg9H0Flh", "6_200_zcDLaZ3b", "6_8_0UPxbDYA", "6_106_boA2KUSu", "1_198_dYlOSQOD", "1_6_xGrwqq16", "1_6_KQMVOQ0g", "1_6_ClDjv3V5", "1_77_KIShoMk3", "1_81_W6BOzpK2", "1_98_COuk57Ci", "1_102_zNSwBuue", "1_176_QVmLl54o", "1_8_lvUBR5F8", "1_102_U9Yb3oVd", "1_6_A9yxE9Ke", "1_102_8CUwsgHP", "1_6_GfRbsVWM", "1_102_0QiGc6S6", "1_102_UZE9uz56", "2_9011_tItR6sEf", "2_9011_nZi4fKds", "2_9011_65k5lHxU", "2_9012_Sd2Q088D", "2_9012_hl1W8RZs", "2_9012_6g0xhggi", "2_9011_MP4jLdJh", "2_9012_0G3fKGYb", "3_5_tWHwh063", "3_6_naL1J006", "3_6_fT0n14Vt", "3_6_YJaj0Opm", "3_77_nD0vn2bU", "3_98_h2HoKRSi", "3_176_0fiHAulF", "3_191_MLmY2yB1", "3_200_IBmris38", "3_8_OQpzcCnS", "3_102_vqGCFPFq", "3_6_nVvz91uS", "3_102_2iz946D6", "4_62_QR1GYbvD", "4_6_Cnt5FMOg", "4_76_CnmCUGyG", "4_181_ObxFt3lm", "4_200_G2Op923t", "4_8_SCGVmKHb", "4_102_lt0d2PeU", "5_47_MZFZnvX4", "5_200_rJVAIaHo", "7_6_KK4FaFV3", "7_77_rBi9iqU7", "7_81_Mmsc26yL", "7_176_nVpEwOrl", "7_8_zkpajjvm", "19_24_ETdxjU8a", "19_198_QRQyQVpP", "19_8_EHbj07Ys", "19_8_rNL5LJER", "8_198_za7D2lO5", "8_6_G8FL0ShI", "8_6_faEPan8O", "8_77_SzD3Lkgt", "8_8_Stv0V7h5", "8_8_nmjJVR7B", "8_8_ncwd4OJg", "9_76_WxHfCw7j", "9_181_UJRjmLT9", "9_8_CrHenuqG", "9_8_hbCfpabM", "9_182_Ywy81Djb", "9_8_ltlih78J", "10_76_nLBbqJDS", "10_181_jacSiHjd", "10_8_8K9IG0Td", "12_6_6ecm9Xlr", "12_6_CvPuKVY0", "12_98_nm8RF0ON", "12_154_jNqF318i", "12_8_hjY9yg16", "12_5_2iEGsZhr", "12_102_lCcxUj31", "11_6_MFZy7Eom", "11_6_tMoe7Y0g", "11_8_UwAwNo2E", "14_6_2RABlYFn", "14_8_jXzWoWa5", "14_8_KGO4pUqO", "14_8_0SwtclaU", "14_8_U7TfIXUu", "14_197_8bSbHipn", "14_8_hGLC5Bah", "14_8_W6KG4VEb", "14_8_hxHR9kGl", "14_8_byRjyCJO", "15_8_GS36K259", "15_197_MRDsXMKF", "15_8_42FbPIs2", "15_8_Mmkx9baa", "13_8_OG7nzYAD", "13_8_AkPEBy3K", "13_8_2i0B6Zul", "13_93_KfDQ6H86", "13_8_KhWRqihE", "17_8064_pSDwFmA2", "17_8065_YwouxX6p", "18_24_OICsE7P8", "18_24_lnHbQKrJ", "18_24_A9VciAso", "18_24_GYMw4gKo", "26_8_ruJ9pBzd", "25_9995_EJ1XGOEs", "25_9996_Oj29TrUm", "22_8_f7ITstK5", "22_6_CtMYh31I", "23_8150_v5mY2VHL", "23_8150_0WT9Phuh", "23_8150_nqOdP4Wh", "23_8150_CrmQoWqj", "23_8150_WQvE7HHH", "23_8150_buZKLqDG", "23_8150_4K0lj5hO", "23_8150_2N8xUvQK", "23_8150_YVEWtJhI", "24_8_ttMTnaKq", "24_8_z3LXoJZk", "24_8_vXupZVde", "24_8_z3VAZkC1", "24_8_8xWQf8rq", "24_8_nTUUgSck", "34_7300_EcSVXVwf", "34_7300_lptFeFBL", "34_7300_ABz7kU4b", "35_197_biXWRQSN", "35_197_j3ZUJ1y7", "35_197_lptXr60I", "35_197_KbeZZGu8", "35_197_vmEZ5XXJ", "36_7402_8CN3d6SA", "36_7404_zF9M0iH9", "42_93_2mjPD8xq", "42_5_tfrUHIzn", "42_93_xIekCOkQ", "42_5_WK02yCWs"];
        
        /*
        1_198_dYlOSQOD
        1_77_KIShoMk3
        1_81_MNEDyOlF
        1_176_QVmLl54o
        1_98_COuk57Ci
        1_139_Or1bBrWD
        1_145_GOvB22xg
        1_155_UmMRoGzp
        1_158_YacqHHdS россия
        1_6_ClDjv3V5
        1_6_xGrwqq16
        */
        
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
        
        function check_country(league){
            if (league && league.country && priorityCountries.includes(league.country)) return true;
            return false;
        }
        function check_id(league) {
            if (league && league.id && priorityIDs[league.id] != undefined) return +priorityIDs[league.id];
            return -1;
        }
        dataArray.sort((a,b) => {
            const leagueA = a[0];
            const leagueB = b[0];
            console.log(leagueA, leagueB); 
            if (check_id(leagueA) > check_id(leagueB)) return -1;
            if (check_id(leagueA) < check_id(leagueB)) return 1;
            if (check_country(leagueA)) return -1;
            if (check_country(leagueB)) return 1; 
            return 0;
        });
        return dataArray;
    }

    if (!data) return (<div class="ui-block">Загрузка данных</div>);
    if (!data) return ("Ошибка");

    return (
        <div class="ui-block main-section__ui-block">
            <div class="matches">
                <div class="matches__top">
                    {navButtons()}
                    <DateInput/>
                </div>
                <div class="matches__body">
                    {renderMatches(data)} 
                </div>
            </div>
        </div>
    );
}

const ScoreboardContext = createContext();

const useScoreboard = () => {
    return useContext(ScoreboardContext);
};

const ScoreboardProvider = ({ children }) => {

    const [date, setDate] = useState(0);
    const [filter, setFilter] = useState('all');

    return (
        <ScoreboardContext.Provider value={{ date, setDate, filter, setFilter }}>
            {children}
        </ScoreboardContext.Provider>
    );
};

export { Scoreboard, ScoreboardProvider, useScoreboard };

