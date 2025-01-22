import { useState, createContext, useContext } from "react";
import MatchCard from "./MatchCard";
import { useEffect } from "react";
import "../scripts/closing-list.js";

import arrowIcon from "../images/icons/arrow.svg";
import { ClosingList, ClosingListBody, ClosingListButton } from "./ClosingList.jsx";
import DateInput from "./DateInput.jsx";

function Scoreboard(props) {

    const data = props.data;
    const { filter, setFilter, date } = useScoreboard();
    const dayBias = date; // 0 is today, -1 is yesterday ...

    // checks if timestamp refers to the selected day
    function is_that_day(timestamp){
        if (!timestamp) return false;
        let date = new Date(timestamp * 1000);
        let today = new Date();
        if (date.getDate() == today.getDate() + dayBias) return true;
        return false;
    }

    function check_filter (match) {

        if (!match) return false;
        if (!is_that_day(match.time)) return false;

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
            default:
                return false;
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
        data = sort_leagues(data);
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
            "6_xGrwqq16": 2,
            "6_A9yxE9Ke": 0,
            "81_W6BOzpK2": 0
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

