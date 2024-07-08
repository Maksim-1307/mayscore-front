import { useState } from "react";
import Match from "./Match";
import { useEffect } from "react";

import arrowIcon from "../images/icons/arrow.svg";
import calenderIcon from "../images/icons/calender.png";

function Scoreboard() {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

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
                        <Match data={block} />
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
        return content
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://mayscor.ru/api/matches.php', { 
                    method: 'GET'
                 });
                const textData = await response.text();
                const jsonData = JSON.parse(textData);
                setData(jsonData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 60000); // Обновление данных каждую минуту

        return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента

    }, []);

    if (isLoading && !data) return (<div class="ui-block">Загрузка данных</div>);
    if (!data) return ("Ошибка");

    /*
    useEffect(() => {
    res.setHeader('Access-Control-Allow-Origin', 'https://your-website.com'); // Замените на ваш домен
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  }, []);



    */

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