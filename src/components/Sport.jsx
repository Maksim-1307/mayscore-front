import Sidebar from "./Sidebar";
import {Scoreboard, ScoreboardProvider, useScoreboard} from "./Scoreboard";
import { useLocation, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import League from "./League";
import Country from "./Country"
import { useState, useEffect, useReducer } from "react";
import Banner from "./Banner";


function Sport (props) {

    const {sport} = useParams();

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const { date, setDate } = useScoreboard();

    useEffect(() => {
        const time = 60000;
        const urlData = {
            sport: sport,
            date: date
        };
        const urlParams = new URLSearchParams(urlData).toString();
        const url = 'https://mayscor.ru/api/matches.php?' + urlParams;

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

    }, [date]);

    return(
        <section class="main-section">
            <div className='container'>
                <Sidebar data={data}/>
                <div className="content">
                    <Banner className={'desctop-banner'}/>
                    <Scoreboard data={data}/>
                </div>
            </div>
        </section>
    );
}

export default Sport;