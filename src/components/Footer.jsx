import { Link } from "react-router-dom";
import League from "./League";
import { useEffect } from "react";

function Footer () {

    const [data, setData] = useEffect(null);

    const topLeague = {
        sport: "football",
        country: "russia",
        league: "premier-league",
    };

    const getDefaultLeagues = () => {
        const elems = [];
        const defaultLeagues = [
            ["Премьер-лига России", "/football/russia/premier-league/"],
            ["Премьер-лига Англии", ""],
            ["Серия А", "/football/italy/serie-a/"],
            ["Испания", ""],
            ["Франция", ""], 
            ["Германия", ""],
            ["Лига наций УЕФА", "/football/europe/uefa-nations-league/"],
            ["Лига чемпионов", "/football/europe/champions-league/"]
        ];
        defaultLeagues.forEach((league)=>{
            elems.push((<b><a href={league[1]}>{league[0]}, </a></b>));
        });
        return elems;
    }

    useEffect(() => {

        const urlParams = new URLSearchParams(topLeague).toString();
        const url = 'https://mayscor.ru/api/league.php?' + urlParams;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });
                const textData = await response.text();
                const jsonData = JSON.parse(textData);
                setData(jsonData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchData();

    }, []);

    useEffect(()=>{
        console.log("its russia premier league data: ", data); 
    }, [data]);
    /*
    
    привет.можно еще чтоб вот здесь тоже были лиги что и на странице вверху главные самые. россия англия италия испания франция  германия лига чемпионов лига европы

    */

    return (
        <footer className="footer">
            <div className="container">
                <a href="/"><b>MayScor.ru</b></a> предлагает прямые трансляции и результаты с более 1000 чемпионатов, кубков и турниров по футболу, включая такие топовые турниры как {getDefaultLeagues()}. Онлайн трансляции матчей (livescore) показывают счет по ходу матча, а также другую статистику LIVE. Футбольные результаты матчей (livescore) обновляются в режиме реального времени. Кроме футбола вы можете сегодня следить на <a href="/"><b>MayScor</b></a> за хоккеем ([результаты КХЛ, НХЛ и ВХЛ]), теннисом и 30+ другими видами спорта.
                [Чемпионат Казахстана live на FlashscoreKZ.com!] Следующие матчи: 14.09. Женис - Кайсар, Астана - Кызылжар, Туран - Шахтер Караганда, 15.09. Елимай Семей - Тобол, Ордабасы - Атырау, Актобе - Жетысу, 18.09. Кайсар -
                Астана, 21.09. Атырау - Женис, Ордабасы - Астана, Кайрат Алматы • Кайсар. Чемпионат Казахстана онлайн, результаты, расписание, таблица Премьер
            </div>
        </footer>
    );
}

export default Footer;