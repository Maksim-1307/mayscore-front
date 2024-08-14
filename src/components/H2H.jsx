import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function H2H () {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const {matchid} = useParams();

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

        const H2HTab = (elemdata) => {
            return (<div>{elemdata['KA']}</div>);
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
                //return dateObj.toString();
                //console.log((+elemdata['KC'] * 1000) + " is " + dateObj.toString());
                //return dateObj.toString();
                return [day, month, year].join('.');
            }

            return (
                <><div className="h2h-match">
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
                </div>
                <div className="match-delmiter"></div>
                </>
            );
        }

        let elements = [];

        data.forEach(elem => {
            if (is_title(elem)) elements.push(<>{H2HTitle(elem)}</>); 
            if (is_tab(elem)) elements.push(<>{H2HTab(elem)}</>); 
            if (is_match(elem)) elements.push(<>{H2HMatch(elem)}</>); 
        });
        return elements;
    }

    useEffect(() => {
        const time = 60000;
        const url = `https://local-ruua.flashscore.ninja/46/x/feed/df_hh_1_${matchid}`;

        if (!matchid) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
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

    useEffect(() => {
        console.log(data);
    }, [data]);


    return (<>{render_content()}</>);
}

export default H2H;