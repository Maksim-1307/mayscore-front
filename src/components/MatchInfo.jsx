import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function MatchInfo() {
    const { matchid } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const urlData = {
            id: matchid,
        };
        const urlParams = new URLSearchParams(urlData).toString();
        const url = 'https://mayscor.ru/api/matchdata.php?' + urlParams;

        const fetchData = async () => {
            //setLoading(true);
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
                //setLoading(false);
            }
        };

        fetchData();

    }, []);

    function validateData() {
        if (data["referee"] == " ()") return false;
        return true;
    }

    if (!data || !validateData()) return;


    return (<>{data["referee"]}</>);

}

export default MatchInfo;