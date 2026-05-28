import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import arrowGreen from '../images/icons/arrow-green.svg';
import arrowRed from '../images/icons/arrow-red.svg';

import config from "../config";
import { joinUrl } from "../helpers/joinUrl";

function MatchCoefficients(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { matchid } = useParams();
    const { full, setFull } = useState(true); 

    useEffect(() => {
        const time = 600000;
        const targetUrl = `https://global.ds.lsapp.eu/odds/pq_graphql?_hash=oce&eventId=${matchid}&projectId=46&geoIpCode=RU&geoIpSubdivisionCode=RUTA`;
        // https://global.ds.lsapp.eu/odds/pq_graphql?_hash=oce&eventId=IcJBYh6e&projectId=32&geoIpCode=NL&geoIpSubdivisionCode=NLNH

        const proxyUrl = joinUrl(config.API_URL, '/proxy.php?url=' + encodeURIComponent(targetUrl));

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(targetUrl, {
                    method: 'GET'
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


    // odds renderers 

    function oneXtwo(oddsData) {
        let numbers = [];
        oddsData.odds.forEach(odd => {
            const opening = odd.opening;
            const value = odd.value;
            const positive = opening < value;
            numbers.push(
                <div className="coefficient__column">
                    <div className="coefficient-number">
                        <img src={ positive ? arrowGreen : arrowRed } alt="" />
                        <span>{value}</span>
                    </div>
                </div>
            );
        });
        let buf = numbers[1];
        numbers[1] = numbers[0];
        numbers[0] = buf;
        return (
            <>
            1x2
            <div className="coefficient">
                <div className="match-time coefficient__row">
                    <div className="coefficient__big-column">букмекер</div>
                    <div className="coefficient__column">1</div>
                    <div className="coefficient__column">x</div>
                    <div className="coefficient__column">2</div>
                </div>
                <div className="coefficient__row">
                    <div className="coefficient__big-column"></div>
                    {numbers}
                </div>
            </div>
            </>
        );
    }
    function overUnder(oddsData) {
        let numbers = [];
        const odds = oddsData.odds;
        for (let i = 0; i < odds.length; i += 2) {
            const odd1 = odds[i];
            const odd2 = odds[i+1];
            const handicapVal = odd1.handicap.value;
            const odd1val = odd1.value;
            const odd2val = odd2.value;
            const odd1positive = odd1.value > odd1.opening;
            const odd2positive = odd2.value > odd2.opening;

            let oddsRow = [];
            oddsRow.push(
                <div className="coefficient__column">
                    <div className="coefficient-number coefficient-number--handicap">
                        <span>{handicapVal}</span>
                    </div>
                </div>
            );
            oddsRow.push(
                <div className="coefficient__column">
                    <div className="coefficient-number">
                        <img src={odd1positive ? arrowGreen : arrowRed} alt="" />
                        <span>{odd1val}</span>
                    </div>
                </div>
            );
            oddsRow.push(
                <div className="coefficient__column">
                    <div className="coefficient-number">
                        <img src={odd2positive ? arrowGreen : arrowRed} alt="" />
                        <span>{odd2val}</span>
                    </div>
                </div>
            );

            //numbers[handicapVal] = ();
            numbers.push(
                <div className="coefficient">
                    <div className="match-time coefficient__row">
                        <div className="coefficient__big-column">букмекер</div>
                        <div className="coefficient__column">тоталы</div>
                        <div className="coefficient__column">больше</div>
                        <div className="coefficient__column">меньше</div>
                    </div>
                    <div className="coefficient__row">
                        <div className="coefficient__big-column"></div>
                        {oddsRow}
                    </div> 
                </div>
            );
        }
        return (
            <>
                больше/меньше
                {numbers}
            </>
        );
    }
    function doubleChance(oddsData) {
        let numbers = [];
        oddsData.odds.forEach(odd => {
            const opening = odd.opening;
            const value = odd.value;
            const positive = opening < value;
            numbers.push(
                <div className="coefficient__column">
                    <div className="coefficient-number">
                        <img src={positive ? arrowGreen : arrowRed} alt="" />
                        <span>{value}</span>
                    </div>
                </div>
            );
        });
        let buf = numbers[1];
        numbers[1] = numbers[0];
        numbers[0] = buf;
        return (
            <>
                двойной исход
                <div className="coefficient">
                    <div className="match-time coefficient__row">
                        <div className="coefficient__big-column">букмекер</div>
                        <div className="coefficient__column">1x</div>
                        <div className="coefficient__column">12</div>
                        <div className="coefficient__column">2x</div>
                    </div>
                    <div className="coefficient__row">
                        <div className="coefficient__big-column"></div>
                        {numbers}
                    </div>
                </div>
            </>
        );
    }
    function currentScore(oddsData) {
        let numbers = [];
        oddsData.odds.forEach(odd => {
            const opening = odd.opening;
            const value = odd.value;
            const positive = opening < value;
            const score = odd.score;
            numbers.push(
                <div className="coefficient">
                    <div className="match-time coefficient__row">
                        <div className="coefficient__big-column">букмекер</div>
                        <div className="coefficient__column">тс</div>
                        <div className="coefficient__column">1</div>
                    </div>
                    <div className="coefficient__row">
                        <div className="coefficient__big-column"></div>
                        <div className="coefficient__column">
                            <div className="coefficient-number coefficient-number--noborder">
                                <span>{score}</span>
                            </div>
                        </div>
                        <div className="coefficient__column">
                            <div className="coefficient-number">
                                <img src={positive ? arrowGreen : arrowRed} alt="" />
                                <span>{value}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        let buf = numbers[1];
        numbers[1] = numbers[0];
        numbers[0] = buf;
        return (
            <>
                точный счет
                {numbers}
            </>
        );
    }
    /*
    function asianHandicap(oddsData){
        let numbers = [];
        const odds = oddsData.odds;
        for (let i = 0; i < odds.length; i += 2) {
            const odd1 = odds[i];
            const odd2 = odds[i + 1];
            const handicapVal = odd1.handicap.value;
            const odd1val = odd1.value;
            const odd2val = odd2.value;
            const odd1positive = odd1.value > odd1.opening;
            const odd2positive = odd2.value > odd2.opening;

            let oddsRow = [];
            oddsRow.push(
                <div className="coefficient__column">
                    <div className="coefficient-number coefficient-number--handicap">
                        <span>{handicapVal}</span>
                    </div>
                </div>
            );
            oddsRow.push(
                <div className="coefficient__column">
                    <div className="coefficient-number">
                        <img src={odd1positive ? arrowGreen : arrowRed} alt="" />
                        <span>{odd1val}</span>
                    </div>
                </div>
            );
            oddsRow.push(
                <div className="coefficient__column">
                    <div className="coefficient-number">
                        <img src={odd2positive ? arrowGreen : arrowRed} alt="" />
                        <span>{odd2val}</span>
                    </div>
                </div>
            );

            //numbers[handicapVal] = ();
            numbers.push(
                <div className="coefficient">
                    <div className="match-time coefficient__row">
                        <div className="coefficient__big-column">букмекер</div>
                        <div className="coefficient__column">тоталы</div>
                        <div className="coefficient__column">больше</div>
                        <div className="coefficient__column">меньше</div>
                    </div>
                    <div className="coefficient__row">
                        <div className="coefficient__big-column"></div>
                        {oddsRow}
                    </div>
                </div>
            );
        }
        return (
            <>
                азиатский гандикап
                {numbers}
            </>
        );
    }*/

    const oddRenderers = {
        'HOME_DRAW_AWAY': oneXtwo,
        'OVER_UNDER': overUnder,
        'DOUBLE_CHANCE': doubleChance,
        'CORRECT_SCORE': currentScore,
    };

    const getCoefficients = () => {
        if (!data) return;

        let elements = [];
        data.data.findOddsByEventId.odds.forEach((block)=>{
            elements.push(renderOdd(block));
        });

        function renderOdd (oddData) {
            const oddType = oddData.bettingType;
            if (oddRenderers[oddType] == undefined) return;
            return oddRenderers[oddType](oddData);
        }

        return elements;
    }

    return(<>
        {getCoefficients()}
    </>);
}

export default MatchCoefficients;