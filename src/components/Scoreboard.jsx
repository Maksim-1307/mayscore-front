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
        console.log(match);
        const status = match.status;
        switch (filter) {
            case "all": 
                return true;
                break;
            case "live":
                if (status == 2) return true;
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
        if (leagueData[0]) return (
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
                    {leagueData.map((block) => {
                        if (!check_filter(block)) return;
                        return (<>
                            <MatchCard data={block} />
                            <div class="match-delmiter"></div>
                        </>)
                    })}    
                </ClosingListBody>
            </ClosingList>
            );
        }
        let content = [];
        let leagueData = [];
        data.forEach(block => {
            if (block && block.blockType == "league") {
                content.push(renderLeague(leagueData));
                leagueData = [];
            } 
            leagueData.push(block);

        });
        content.push(renderLeague(leagueData));
        return content
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


