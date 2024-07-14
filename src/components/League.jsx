import Sidebar from "./Sidebar";
import Scoreboard from "./Scoreboard";
import { useLocation, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useReducer } from "react";
import Breadcrumbs from "./Breadcrumbs";


function League(props) {

    const location = useLocation();
    const pathData = location.pathname.split('/');
    const sport = pathData[1];
    const country = pathData[2];
    const league = pathData[3];

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const time = 60000;
        const urlData = {
            sport: sport, 
            country: country,
            league: league,
        };
        const urlParams = new URLSearchParams(urlData).toString();
        const url = 'https://mayscor.ru/api/league.php?' + urlParams;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    method: 'GET',
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

        const intervalId = setInterval(fetchData, time);

        return () => clearInterval(intervalId);

    }, []);

    if (!data) return;

    return (
        <section class="main-section">
            <div className='container'>
                <Sidebar />
                <div className="content">
                    <div class="ui-block league-ui-block">
                        <div class="league">
                            <div class="league__top">
                                <Breadcrumbs />
                            </div>
                            <div class="league__middle">
                                <div className="league__image-wrapper">
                                    <img class="league__image" src={data[1].icon} />
                                </div>
                                <div class="league__info">
                                    <h1 class="league__name">{data[1].name}</h1>
                                    <div class="league__season">2023/2024</div>
                                </div>
                            </div>
                            <div class="league__bottom">
                                <div class="nav-list league__nav-list"><button
                                    class="nav-list__point nav-list__point--current"><span
                                        class="nav-list__text">обзор</span>
                                    <div class="nav-list__line"></div>
                                </button><button class="nav-list__point"><span
                                    class="nav-list__text">результаты</span>
                                        <div class="nav-list__line"></div>
                                    </button><button class="nav-list__point"><span class="nav-list__text">таблица</span>
                                        <div class="nav-list__line"></div>
                                    </button></div>
                            </div>
                        </div>
                    </div>
                    <Scoreboard data={data} />
                </div>
            </div>
        </section>
    );
}

export default League;