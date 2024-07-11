import Sidebar from "./Sidebar";
import Scoreboard from "./Scoreboard";
import { useLocation, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react";


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

    return (
        <section class="main-section">
            <div className='container'>
                <Sidebar />
                <div className="content">
                    <Scoreboard data={data} />
                </div>
            </div>
        </section>
    );
}

export default League;