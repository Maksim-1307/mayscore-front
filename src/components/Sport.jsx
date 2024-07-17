import Sidebar from "./Sidebar";
import Scoreboard from "./Scoreboard";
import { useLocation, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import League from "./League";
import Country from "./Country"
import { useState, useEffect } from "react";


function Sport (props) {

    const {sport} = useParams();

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const time = 60000;
        const urlData = {
            sport: sport
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

    }, []);

    return(
        <section class="main-section">
            <div className='container'>
                <Sidebar data={data}/>
                <div className="content">
                    <Scoreboard data={data}/>
                </div>
            </div>
        </section>
    );
}

export default Sport;