import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MatchTable () {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const {matchid} = useParams();

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
        const url = `https://local-ruua.flashscore.ninja/46/x/feed/df_to_1_${matchid}_1`;

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

    }, []);

    const TableLines = () => {

        const Line = (lineData) => {
            if (lineData[0]['TN'] == undefined) return;
            console.log(lineData);
            return(
                <div className="table__row">
                        <div className="table__col table__col--32">
                            {lineData[0]['TR']}.
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
                        <div className="table__col table__col--32">
                            {lineData[0]['TP']}
                        </div>
                        <div className="table__col table__col--160">
                            форма
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
        return lines;

    }

    return(<>
        <div className="match-table">
            <div className="match-table__top">

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