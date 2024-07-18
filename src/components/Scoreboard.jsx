import { useState, createContext, useContext } from "react";
import MatchCard from "./MatchCard";
import { useEffect } from "react";
import "../scripts/closing-list.js";

import arrowIcon from "../images/icons/arrow.svg";
import { ClosingList, ClosingListBody, ClosingListButton } from "./ClosingList.jsx";
import DateInput from "./DateInput.jsx";

function Scoreboard(props) {

    const data = props.data;

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
                    <div class="nav-buttons">
                        <button
                            class="button-1 nav-buttons__button nav-buttons__button--active">все
                        </button>
                        <button
                            class="button-1 nav-buttons__button">live
                        </button>
                        <button
                            class="button-1 nav-buttons__button">рассписание
                        </button>
                        <button
                            class="button-1 nav-buttons__button">завершенные
                        </button>
                    </div>
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


