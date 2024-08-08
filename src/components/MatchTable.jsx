import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MatchTable () {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const {matchid} = useParams();
    const [tab, setTab] = useState(1);

    function handle_data(response) {
        let blocks = response.split('~');
        for (let i = 0; i < blocks.length; i++) {
            blocks[i] = blocks[i].split('¬');
            let block = [];
            blocks[i].forEach(prop => {
                const [key, val] = prop.split('÷');
                if (key && val) block[key] = val;
            });
            blocks[i] = block;
        }
        return blocks;
    }

    useEffect(() => {
        const time = 60000;
        const url = `https://local-ruua.flashscore.ninja/46/x/feed/df_to_1_${matchid}_${tab}`;

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

    }, [tab]);

    const TableLines = () => {

        const LineFormElement = (elementData) => {
            if (!elementData['LMS']) return;
            const colorModificator = () => {
                switch (elementData['LMS']){
                    case "Н":
                        return "table__element--yellow";
                    case "B":
                        return "table__element--green";
                    case "П":
                        return "table__element--red";
                    default:
                        return;
                }
            }
            return(
                <div className={`table__element ${colorModificator()}`}>
                    {elementData['LMS']}
                </div>
            );
        }

        const Line = (lineData) => {
            if (lineData[0]['TN'] == undefined) return;
            console.log(lineData);

            function printFormElements () {
                let elements = [];
                for (let i = 1; i < lineData.length; i++) {
                    elements.push(LineFormElement(lineData[i]));
                }
                return elements;
            }

            const colorModificator = () => {
                switch (lineData[0]['TU']) {
                    case "q1": 
                        return "table__element--blue";
                    case "q2":
                        return "table__element--light-blue";
                }
                return;
            }

            return(
                <div className="table__row">
                        <div className="table__col table__col--32 table__col--bold">
                            <div className={`table__element ${colorModificator()}`}>
                                {lineData[0]['TR']}.
                            </div>
                        </div>
                        <div className="table__col table__col--grow">
                            {lineData[0]['TN']}
                        </div>
                        <div className="table__col table__col--32">
                            {lineData[0]['TM']}
                        </div>
                        <div className="table__col table__col--32">
                            {lineData[0]['TW']}
                        </div>
                        <div className="table__col table__col--32">
                            {lineData[0]['TDR']}
                        </div>
                        <div className="table__col table__col--32">
                            {lineData[0]['TLR']}
                        </div>
                        <div className="table__col table__col--48">
                            {lineData[0]['TG']}
                        </div>
                        <div className="table__col table__col--48">
                            {lineData[0]['TPF']}
                        </div>
                        <div className="table__col table__col--32 table__col--bold">
                            {lineData[0]['TP']}
                        </div>
                        <div className="table__col table__col--160">
                            { printFormElements() }
                        </div>
                    </div>
            );
        }

        if (!data) return;
        let lines = [];
        let lineData = [];

        data.forEach(block => {
            if (block["TN"] != undefined) {
                lines.push(Line(lineData));
                lineData = [];
            }
            lineData.push(block);
        });
        lines.push(Line(lineData));

        lines = lines.filter(element => element !== undefined);

        if (lines.length) return lines;
        return (<div className="table__no-data">нет данных</div>);

    }

    function isActiveTab(tabNum) {
        if (tabNum == tab) return 'nav-buttons__button--active';
        return;
    }

    return(<>
        <div className="match-table">
            <div className="match-table__top">
                <div className="nav-buttons">
                    <button className={`button-1 nav-buttons__button ${isActiveTab(1)}`} onClick={()=>setTab(1)}>ИТОГО</button>
                    <button className={`button-1 nav-buttons__button ${isActiveTab(2)}`} onClick={()=>setTab(2)}>ДОМА</button>
                    <button className={`button-1 nav-buttons__button ${isActiveTab(3)}`} onClick={()=>setTab(3)}>В ГОСТЯХ</button>
                </div>
            </div>
            <div className="match-table__body">
                <div className="table">
                    <div className="table__row table__header">
                        <div className="table__col table__col--32">
                            #
                        </div>
                        <div className="table__col table__col--grow">
                            Команда
                        </div>
                        <div className="table__col table__col--32">
                            и
                        </div>
                        <div className="table__col table__col--32">
                            в
                        </div>
                        <div className="table__col table__col--32">
                            н
                        </div>
                        <div className="table__col table__col--32">
                            п
                        </div>
                        <div className="table__col table__col--48">
                            г
                        </div>
                        <div className="table__col table__col--48">
                            рг
                        </div>
                        <div className="table__col table__col--32">
                            о
                        </div>
                        <div className="table__col table__col--160">
                            форма
                        </div>
                    </div>
                    <TableLines />
                </div>
            </div>
            <div className="match-table__bottom"></div>
        </div>
    </>);

}

export default MatchTable;