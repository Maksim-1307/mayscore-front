import { useParams } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { statusTranslations } from "../helpers/translations";
import MatchInfo from "./MatchInfo";
import MatchProgress from "./MatchProgress";
import MatchStatistic from "./MatchStatistic";
import MatchCoefficients from "./MatchCoefficients";
import MatchTable from "./MatchTable";
import H2H from "./H2H";
import Helmet from "./Helmet";
import { renderToReadableStream } from "react-dom/server";
import Banner from "./Banner";

function Match(){

    const {matchid} = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [tab, setTab] = useState('match');

    useEffect(() => {
        const time = 60000;
        const urlData = {
            id: matchid,
        };
        const urlParams = new URLSearchParams(urlData).toString();
        const url = 'https://mayscor.ru/api/match.php?' + urlParams;

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

    const status = () => {

        if (!data) return;
        switch (data.maindata[0].status) {
            case "1": return null; 
        }
        return statusTranslations[data.maindata[0].status];
    }

    const time = () => {
        if (!data) return;
        switch (data.maindata[0].status){
            case "1": {
                const timestamp = data.maindata[0].start_time;
                const date = new Date(timestamp * 1000);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const yeahr = date.getFullYear();
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                const formattedTime = `${day}.${month}.${yeahr} ${hours}:${minutes.substr(-2)}`;
                return formattedTime;
            }
            case "3": {
                const timestamp = data.maindata[0].end_time;
                let date = new Date(timestamp * 1000);
                let day = date.getDate();
                let month = date.getMonth()+1;
                let yeahr = date.getFullYear();
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let formattedTime = `${day}.${month}.${yeahr} ${hours}:${minutes.substr(-2)}`;
                return formattedTime;
            }
            
        }
    }

    const score = () => {
        if (!data) return;
        switch (data.maindata[0].status) {
            case "1":
                return (<div className="game__score">vs</div>); 
            case "2":
            case "3":
                return (
                <div className="game__score">
                    <span>{data.maindata[0].commandA_score}</span>
                    <span> - </span>
                    <span>{data.maindata[0].commandB_score}</span>
                </div>);
        }
    }

    const breadcrumbsData = () => {
        if (!data) return; 
        let bcData = [data.htmldata.header.tournament.category, data.htmldata.header.tournament.tournament];
        return bcData;
    }

    function renderContent () {
        switch (tab) {
            case "coeff":
                return (<>
                    <MatchCoefficients />
                </>);
            case "h2h":
                return (<H2H />);
            case "table":
                return (<MatchTable />);
            default:
                return (<>  
                    <MatchProgress />
                    <MatchStatistic />
                </>)
        }
    }

    function helmet () {

        if (!data) return;

        let tabname = "";

        switch (tab) {
            case "coeff":
                tabname = "Коэффициенты";
                break;
            case "h2h":
                tabname = "H2H";
                break;
            case "table":
                tabname = "Таблица";
                break;
            default:
                tabname = "";
                break;
        }

        if (tabname) tabname = "  | " + tabname;

        return (<Helmet
        
            title={data.htmldata.participantsData.home[0].name + " - " +  data.htmldata.participantsData.away[0].name + tabname}
            description={data.htmldata.header.tournament.category + ": " + data.htmldata.header.tournament.tournament}
        
        />);
    }

    if (!data) return;

    return (<section class="main-section">
        {helmet()}
        <div className='container'>
            <div className="content">
                <Banner />
                <br />
                <div class="ui-block game-ui-block">
                    <div class="game">
                        <div class="game__top">
                            <Breadcrumbs data={breadcrumbsData()}/>
                        </div>
                        <div class="game__middle">
                            <div className="game__command">
                                <div className="game__icon">
                                    <img src={data.htmldata.participantsData.home[0].image_path} alt="" />
                                </div>
                                <div className="game__command-name">
                                    {data.htmldata.participantsData.home[0].name}
                                </div>
                            </div>
                            <div className="game__info">
                                <div className="game__status">{status()}</div>
                                { score() }
                                <div className="game__time">{ time() }</div>
                            </div>
                            <div className="game__command">
                                <div className="game__icon">
                                    <img src={data.htmldata.participantsData.away[0].image_path} alt="" />
                                </div>
                                <div className="game__command-name">
                                    {data.htmldata.participantsData.away[0].name}
                                </div>
                            </div>
                        </div>
                        <div class="game__bottom">
                            <div class="nav-list league__nav-list">
                                <button 
                                class={tab == 'match' ? "nav-list__point nav-list__point--current" : "nav-list__point"} 
                                onClick={()=>setTab('match')}>
                                    <span class="nav-list__text">матч</span>
                                    <div class="nav-list__line"></div>
                                </button>
                                <button 
                                class={tab == 'coeff' ? "nav-list__point nav-list__point--current" : "nav-list__point"} 
                                onClick={() => setTab('coeff')}>
                                    <span class="nav-list__text">коэфф.</span>
                                    <div class="nav-list__line"></div>
                                </button>
                                <button 
                                class={tab == 'h2h' ? "nav-list__point nav-list__point--current" : "nav-list__point"} 
                                onClick={() => setTab('h2h')}>
                                    <span class="nav-list__text">h2h</span>
                                    <div class="nav-list__line"></div>
                                </button>
                                <button 
                                class={tab == 'table' ? "nav-list__point nav-list__point--current" : "nav-list__point"} 
                                onClick={() => setTab('table')}>
                                    <span class="nav-list__text">таблица</span>
                                    <div class="nav-list__line"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui-block">
                    {renderContent()}
                </div>
            </div>
        </div>
    </section>);
}

export default Match; 
