import { Link } from "react-router-dom";
import League from "./League";
import { useEffect, useState } from "react";
import ResponseDecoder from "../helpers/ResponseDecoder";
import { sportsTranslations } from "../helpers/translations";
import config from "../config";
import { joinUrl } from "../helpers/joinUrl";

function Footer () {

    const [nextMatches, setNextMatches] = useState([]);

    const topLeague = {
        sport: "football",
        country: "russia",
        league: "premier-league",
    };

    const getDefaultLeagues = () => {
        const elems = [];
        const defaultLeagues = [
            ["Премьер-лига России", "/football/russia/premier-league/"],
            ["Премьер-лига Англии", "/football/england/premier-league/"],
            ["Серия А Италия", "/football/italy/serie-a/"],
            ["Испания Примера", "/football/spain/laliga/"],
            ["Франция Первая лига", "/football/france/ligue-1/"], 
            ["Германия Бундеслига", "/football/germany/bundesliga/"],
            ["Лига наций УЕФА", "/football/europe/uefa-nations-league/"],
            ["Лига чемпионов", "/football/europe/champions-league/"]
        ];
        defaultLeagues.forEach((league)=>{
            elems.push((<b><a href={league[1]}>{league[0]}, </a></b>));
        });
        return elems;
    }

    const getNextMatches = () => {
        if (!nextMatches) return;
        let elements = [(<span>Следующие матчи: </span>)];
        nextMatches.forEach(match => {
            elements.push((
                <b><a href={`/match/${match["~AA"]}`}>{match["AE"]} - {match["AF"]}, </a></b>
            ));
        });
        return elements;
    }

    async function getNextMatchesOfLeague(leagueData){

        let htmlData = document.createElement('div');

        const targetUrl = `https://www.flashscorekz.com/${leagueData.sport}/${leagueData.country}/${leagueData.league}/fixtures/`;
        const proxyUrl = joinUrl(config.API_URL, '/proxy.php?url=' + encodeURIComponent(targetUrl));

        function fetchData() {
            fetch(proxyUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Не удалось получтить рассписание матчей ' + response.status);
                    }
                    return response.text(); 
                })
                .then(data => {

                    //const lines = data.split('\n');
                    const startIndex = data.search("SA÷1¬~ZA÷");
                    const endIndex = data.indexOf("`", startIndex);
                    const dataString = data.substr(startIndex, endIndex - startIndex);
                    setNextMatches(ResponseDecoder.splitBlocks(dataString).splice(2,10));

                })
                .catch(error => {
                    console.error('Не удалось получтить рассписание матчей ', error);
                });
        }

        fetchData();
    }

    useEffect(() => {

        getNextMatchesOfLeague(topLeague);

    }, []);

    return (
        <footer className="footer">
            <div className="container">
                <a href="/"><b>MayScor.ru</b></a> предлагает прямые трансляции и результаты с более 1000 чемпионатов, кубков и турниров по футболу, включая такие топовые турниры как {getDefaultLeagues()}. Онлайн трансляции матчей (livescore) показывают счет по ходу матча, а также другую статистику LIVE. Футбольные результаты матчей (livescore) обновляются в режиме реального времени. Кроме футбола вы можете сегодня следить на <a href="/"><b>MayScor</b></a> за хоккеем (результаты КХЛ, НХЛ и ВХЛ), теннисом и 30+ другими видами спорта.
                Чемпионат России live на Mayscor.ru! {getNextMatches()} Чемпионат России онлайн, результаты, расписание, таблица
            </div>
        </footer>
    );
}

export default Footer;