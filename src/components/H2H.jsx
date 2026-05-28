import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { joinUrl } from "../helpers/joinUrl";

function H2H () {

    const [data, setData] = useState(null);
    const [tab, setTab] = useState("Итого");
    const [isLoading, setLoading] = useState(true);
    const [showMoreState, setShowMoreState] = useState([]);
    const {matchid} = useParams();

    let renderCounter = 5;
    let showMoreButtonRendered = false;

    const TabButtons = () => {
        if (!data) return;
        let buttons = [];
        data.forEach(el => {
            if (el['KA']){ 
                buttons.push(
                <button 
                    className={is_active(el['KA']) ? "button-1 nav-buttons__button nav-buttons__button--active" : "button-1 nav-buttons__button"}
                    onClick={() => setTab(el['KA'])}
                    >{el['KA']}
                </button>);
            }
        });

        function is_active(name){
            return tab == name;
        }

        return(
            <div className="nav-buttons">{buttons}</div>
        );
    }

    function handle_data(response) {
        let blocks = response.split('~');
        for (let i = 0; i < blocks.length; i++) {
            blocks[i] = blocks[i].split('¬');
            let block = [];
            blocks[i].forEach(prop => {
                const [key, val] = prop.split('÷');
                if (!(key && val)) return;
                block[key] = val;
            });
            blocks[i] = block;
        }
        return blocks;
    }

    function render_content(){
        if (!data) return;

        function is_tab(elem) {
            return (elem['KA'] != undefined);
        }
        function is_title(elem){
            return (elem['KB'] != undefined);
        }
        function is_match(elem) {
            return (elem['KC'] != undefined);
        }
        const H2HTitle = (elemdata) => {
            return (<div className="match-time">{elemdata['KB']}</div>);
        }
        const H2HMatch = (elemdata) => {

            const result = () => {
                switch (elemdata['KN']) {
                    case "w":
                        return(
                            <div className="table__element table__element--green">
                                В
                            </div>
                        );
                    case "l":
                        return(
                            <div className="table__element table__element--red">
                                П
                            </div>
                        );
                    case "d":
                        return(
                            <div className="table__element table__element--yellow">
                                Н
                            </div>
                        );
                }
            }

            const date = () => {
                const dateObj = new Date(+elemdata['KC'] * 1000);
                if (!dateObj) return;
                const year = dateObj.getFullYear() % 100;
                const month = dateObj.getMonth() + 1; 
                const day = dateObj.getDate();
                return [day, month, year].join('.');
            }

            renderCounter--;

            return (
                <><a className="h2h-match" href={"/match/" + elemdata['KP']}>
                    <div className="h2h-match__date">
                        {date()}
                    </div>
                    <div className="h2h-match__league">
                        {elemdata['KI']}
                    </div>
                    <div className="h2h-match__players">
                        <div className="h2h-match__player">
                            <div className="h2h-match__player-icon" style={{ "background-image": `url('https://static.flashscore.com/res/image/data/${elemdata['EC']}')`}}></div>
                            <div className="h2h-match__player-name">{elemdata['FH']}</div>
                            <div className="h2h-match__player-score">{elemdata['KU']}</div>
                        </div>
                        <div className="h2h-match__player">
                            <div className="h2h-match__player-icon" style={{ "background-image": `url('https://static.flashscore.com/res/image/data/${elemdata['ED']}')` }}></div>
                            <div className="h2h-match__player-name">{elemdata['FK']}</div>
                            <div className="h2h-match__player-score">{elemdata['KT']}</div>
                        </div>
                    </div>
                    <div>
                        {result()}
                    </div>
                </a>
                <div className="match-delmiter"></div>
                </>
            );
        }

        let elements = [];

        let flag = false;

        let currentBlock = "";
        data.forEach(elem => {

            if (is_tab(elem)) { 
                if (elem['KA'] == tab) {
                    flag = true;
                } else { 
                    flag = false;
                }
            }


            if (flag) {  
                if (is_title(elem)) {
                    currentBlock = elem['KB']
                    renderCounter = 5;
                    showMoreButtonRendered = false;
                    elements.push(<>{H2HTitle(elem)}</>); 
                }
                if (is_match(elem)) {
                    const ccurentBlock = currentBlock;
                    if (!showMoreState.includes(ccurentBlock) && renderCounter <= 0) {
                        if (!showMoreButtonRendered) elements.push(<button className="h2h__show-more" onClick={() => { setShowMoreState(showMoreState.concat([ccurentBlock])) }}>показать больше матчей</button>); 
                        showMoreButtonRendered = true;
                    } else {
                        elements.push(<>{H2HMatch(elem)}</>); 
                    }
                }
            }
        });
        return elements;
    }


    useEffect(() => {
        const time = 60000;
        const targetUrl = `https://local-ruua.flashscore.ninja/46/x/feed/df_hh_1_${matchid}`;
        const proxyUrl = joinUrl(config.API_URL, '/proxy.php?url=' + encodeURIComponent(targetUrl));

        if (!matchid) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'X-Fsign': 'SW9D1eZo'
                    }
                });
                const textData = await response.text();
                const jsonData = handle_data(textData);
                setData(jsonData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, time);

        return () => clearInterval(intervalId);

    }, []);


    return (<div className="h2h">
        <TabButtons /> 
        {render_content()}
    </div>);
}

export default H2H;