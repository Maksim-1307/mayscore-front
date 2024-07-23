import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import yellowcard from '../images/icons/yellow-card.png';
import redcard from '../images/icons/red-card.png';
import substitution from '../images/icons/substitution.png';

function check_undefined(...props){
    if (!Array.isArray(props)) return false;
    props.forEach((prop) => {
        if (prop === undefined || prop === null) return false;
    });
    return true;
}

const Time = (data, key) => {
    let name, score;
    if (!data) return; 

    name = data.AC_0;
    score = [data["IG_0"], data["IH_0"]];
    if (!name) name = key;

    if (!check_undefined(name, score)) return;
    if (!score[0]) return;
    return (
    <div className="match-time">
        <div className="match-time__name">{name}</div>
        <div className="match-score">{score[0]} - {score[1]}</div>
    </div>
    );
}

const Goal = (data) => {
    if (!data) return;
    if (data["IE_0"] != "3") return;
    const time = data["IB_0"];
    const score = [data["INX_0"], data["IOX_0"]];
    const name = data["IF_0"];
    const command = data["IA_0"];

    if (!check_undefined(time, score, name, command)) return;

    const getClass = () => {
        if (command == 1) return "match-event";
        return "match-event match-event--right";
    }

    return (
        <div className={getClass()}>
            <div className="match-event__time">
                {time}
            </div>
            <div className="match-event__score"> 
                <span className="match-event__goal">гол</span>
                {score[0]} - {score[1]}
            </div>
            <div className="match-event__name-major">{name}</div>
        </div>

    );
}

const Yellowcard = (data) => {
    if (!data) return;
    if (data["IE_0"] != "1") return; 

    const time = data["IB_0"];
    const name = data["IF_0"];
    const command = data["IA_0"];

    if (!check_undefined(time, name, command)) return;

    const getClass = () => {
        if (command == 1) return "match-event";
        return "match-event match-event--right";
    }

    return (
        <div className={getClass()}>
            <div className="match-event__time">
                {time}
            </div>
            <div className="match-event__score">
                <img src={yellowcard} alt="" className="match-event__icon" />
            </div>
            <div className="match-event__name-major">{name}</div>
        </div>

    );
}

const Redcard = (data) => {
    if (!data) return;
    if (data["IE_0"] != "2") return;

    const time = data["IB_0"];
    const name = data["IF_0"];
    const command = data["IA_0"];

    if (!check_undefined(time, name, command)) return;

    const getClass = () => {
        if (command == 1) return "match-event";
        return "match-event match-event--right";
    }

    return (
        <div className={getClass()}>
            <div className="match-event__time">
                {time}
            </div>
            <div className="match-event__score">
                <img src={redcard} alt="" className="match-event__icon" />
            </div>
            <div className="match-event__name-major">{name}</div>
        </div>

    );
}

const Substitution = (data) => {
    if (!data) return;
    if (data["IE_0"] != "6") return;

    const time = data["IB_0"];
    const leaving = data["IF_0"];
    const coming = data["IF_1"];
    const command = data["IA_0"];

    if (!check_undefined(time, leaving, coming, command)) return;

    const getClass = () => {
        if (command == 1) return "match-event";
        return "match-event match-event--right";
    }

    return (
        <div className={getClass()}>
            <div className="match-event__time">
                {time}
            </div>
            <div className="match-event__score">
                <img src={substitution} alt="" className="match-event__icon" />
            </div>
            <div className="match-event__name-major">{coming}</div>
            <div className="match-event__name-minor">{leaving}</div>
        </div>

    );
}

const matchEvents = {
    "0": Time,
    "1": Yellowcard,
    "2": Redcard,
    "3": Goal,
    "6": Substitution
}

function MatchProgress () {

    const { matchid } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const time = 30000;
        const urlData = {
            id: matchid,
        };
        const urlParams = new URLSearchParams(urlData).toString();
        const url = 'https://mayscor.ru/api/matchprogress.php?' + urlParams;

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

    const events = () => {
        let events = [];
        if (!data) return;
        Object.entries(data).forEach(([key, element]) => {
            const eventID = element["IE_0"];
            if (eventID == undefined) {
                events.push(Time(element, key));
            } else {
                if (matchEvents[eventID]) events.push(matchEvents[eventID](element));
            }
        });

        return events;
    }

    return (
    <div className="match-progress">
        {events()}
    </div>
    );
}

export default MatchProgress;