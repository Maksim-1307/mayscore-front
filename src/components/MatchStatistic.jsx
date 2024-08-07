import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MatchStat(data){
    data = data.data;
    const val1 = data[1];
    const val2 = data[2];
    const name = data[0];

    let secondIsMajor = false;
    if (val2 > val1) secondIsMajor = true;

    const lines = () => {

        const get_line_width = () => {
            const v1 = +(val1.replace(/[^\d]/g, ''));
            const v2 = +(val2.replace(/[^\d]/g, ''));
            const sum = v1 + v2;
            const w1 = ((v1 / sum) * 100) + '%';
            const w2 = ((v2 / sum) * 100) + '%';
            return [w1,w2];
        }

        return(
        <>
        <div className={secondIsMajor ? "match-stat__line" : "match-stat__line match-stat__line--major"}>
            <div style={{'width': get_line_width()[0]}}></div>
        </div>
        <div className={secondIsMajor ? "match-stat__line match-stat__line--major" : "match-stat__line"}>
            <div style={{ 'width': get_line_width()[1] }}></div>
        </div>
        </>
        );
    }

    return(
        <div className="match-stat">
            <div className="match-stat__top">
                <div className="match-stat__val">{val1}</div>
                <div className="match-stat__name">{name}</div>
                <div className="match-stat__val">{val2}</div>
            </div>
            <div className="match-stat__bottom">
                {lines()}
            </div>
        </div>
    );
}

function MatchStatistic(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {matchid} = useParams();

    function handle_data(response){
        let periods = response.split('SE');
        let handled = [];
        periods.forEach(element => {
            let SDs = element.split('SD');
            let SEname = SDs[0].split('¬')[0];
            SEname = SEname.replace('÷', '');
            SDs = SDs.slice(1);
            if (SEname) handled[SEname] = handle_stats(SDs);
        });
        function handle_stats(periodStats) {
            let statsArray = [];
            periodStats.forEach((statStr)=>{
                let statProps = statStr.split('¬');
                let statArr = [];
                statProps.forEach(statStr=>{
                    let val = statStr.split('÷')[1];
                    if (val) statArr.push(val);
                });
                if (statArr.length) statsArray.push(statArr.slice(1));
            });
            return statsArray;
        }
        return handled;
    }

    useEffect(() => {
        const time = 60000;
        const url = 'https://local-ruua.flashscore.ninja/46/x/feed/df_st_1_' + matchid;

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

    if (!matchid) return;
    if (!data) return;

    const statisctic = () => {
        let elems = [];
        if (!data['Матч']) return;
        data['Матч'].forEach((elem)=>{
            elems.push((<MatchStat data={elem}/>));
        });
        return elems;
    }

    const elements = statisctic();
    if (!elements || !elements.length) return;

    return (
    <div className="match-statistic">
        <div className="match-statistic__title match-time">Статистика</div>
        <div className="match-statistic__body">
            {elements}
        </div>
    </div>
    );

}

export default MatchStatistic;


// неполная (json)
//https://46.ds.lsapp.eu/pq_graphql?_hash=dsos&eventId=WdIi4gMm&projectId=46
// полная (шифр)
// https://local-ruua.flashscore.ninja/46/x/feed/df_st_1_WdIi4gMm


/*

SE÷Матч
¬~SD÷12¬SG÷Владение мячом¬SH÷60%¬SI÷40%
¬~SD÷34¬SG÷Удары¬SH÷7¬SI÷15
¬~SD÷13¬SG÷Удары в створ¬SH÷4¬SI÷8¬~SD÷14¬SG÷Удары мимо¬SH÷3¬SI÷7¬~SD÷16¬SG÷Угловые¬SH÷8¬SI÷7¬~SD÷19¬SG÷Сэйвы¬SH÷4¬SI÷2¬~SD÷22¬SG÷Красные карточки¬SH÷1¬SI÷0¬~SD÷23¬SG÷Желтые карточки¬SH÷2¬SI÷2¬~SD÷372¬SG÷Атаки¬SH÷45¬SI÷52¬~SD÷373¬SG÷Опасные атаки¬SH÷20¬SI÷35¬~
SE÷1-й тайм¬~SD÷12¬SG÷Владение мячом¬SH÷64%¬SI÷36%¬~SD÷34¬SG÷Удары¬SH÷6¬SI÷10¬~SD÷13¬SG÷Удары в створ¬SH÷3¬SI÷5¬~SD÷14¬SG÷Удары мимо¬SH÷3¬SI÷5¬~SD÷16¬SG÷Угловые¬SH÷2¬SI÷4¬~SD÷19¬SG÷Сэйвы¬SH÷4¬SI÷2¬~SD÷23¬SG÷Желтые карточки¬SH÷1¬SI÷1¬~SD÷372¬SG÷Атаки¬SH÷33¬SI÷42¬~SD÷373¬SG÷Опасные атаки¬SH÷19¬SI÷30
SE÷2-й тайм
¬~SD÷12¬SG÷Владение мячом¬SH÷56%¬SI÷44%¬~SD÷34¬SG÷Удары¬SH÷1¬SI÷5¬~SD÷13¬SG÷Удары в створ¬SH÷1¬SI÷3¬~SD÷14¬SG÷Удары мимо¬SH÷0¬SI÷2¬~SD÷16¬SG÷Угловые¬SH÷6¬SI÷3¬~SD÷19¬SG÷Сэйвы¬SH÷0¬SI÷0¬~SD÷22¬SG÷Красные карточки¬SH÷1¬SI÷0¬~SD÷23¬SG÷Желтые карточки¬SH÷1¬SI÷1¬~SD÷372¬SG÷Атаки¬SH÷12¬SI÷10¬~SD÷373¬SG÷Опасные атаки¬SH÷1¬SI÷5¬~A1÷4b5d802b492569adb33bef1402896139¬~
MatchStatistic.jsx:31 Ошибка загрузки данных: 

*/