import { useState } from "react";
import MatchCard from "./MatchCard";
import { useEffect } from "react";
import "../scripts/closing-list.js";

import arrowIcon from "../images/icons/arrow.svg";
import calenderIcon from "../images/icons/calender.png";

function Scoreboard(props) {

    const data = props.data;

    function renderMatches(data) {
        function renderLeague(leagueData){
        if (leagueData[0]) return (
            <div class="closing-list matches__closing-list">
                <div class="closing-list__top matches__league">
                    <div class="matches__league-title">
                            <img class="matches__icon" src={leagueData[0].icon} />
                            <span class="matches__country">{leagueData[0].country}:</span>
                        <a href={leagueData[0]["url"]} class="matches__league-name">{leagueData[0].name}</a>
                    </div>
                    <button class="closing-list__button"><img src={arrowIcon} /></button>
                </div>
                <div class="closing-list__body"> 
                    {leagueData.map((block) => {
                        return(<>
                        <MatchCard data={block} />
                        <div class="match-delmiter"></div>
                        </>)
                    })}                        
                </div>
            </div>
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
                    <div class="date-input">
                        <div class="button-1"> {"<"} </div>
                        <div class="button-1 date-input__middle">
                            <label class="date-input__label" for="date-input">
                                <img class="date-input__icon" src={calenderIcon} />
                            </label>
                            <input
                                class="date-input__input" type="date" id="date-input"
                                name="date-input" value="2024-06-27" />
                        </div>
                        <div class="button-1">{">"}</div>
                    </div>
                </div>
                <div class="matches__body">
                    {renderMatches(data)} 
                </div>
            </div>
        </div>
    );
}

export default Scoreboard;