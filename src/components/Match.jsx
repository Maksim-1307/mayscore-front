function Match(props) {
    const data = props.data;
    if (!data) return;
    if (data.blockType != "match") return;

    const classname = () => {
        if (data.status == 2) return "match match--live";
        return "match";
    }

    const status = () => {
        const statusTranslations = {
            "1": "&nbsp;",
            "45": "Будет доигран позже",
            "42": "Ждем...",
            "2": "Live",
            "12": "1-й тайм",
            "13": "2-й тайм",
            "6": "Дополнительное время",
            "7": "Серия пенальти",
            "38": "Перерыв",
            "46": "Перерыв",
            "3": "Завершен",
            "10": "После дополнительного времени",
            "11": "После серии пенальти",
            "9": "Неявка",
            "43": "Задержка",
            "36": "Прерван",
            "4": "Перенесен",
            "5": "Отменен",
            "37": "Прерван",
            "54": "Тех. поражение"
        };
        if (data.status == 1) {
            const timestamp = data.time;
            let date = new Date(timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }
        return statusTranslations[data.status];
    }

    const score = () => {
        if (data.status == 1 || data.status == 4){
            return (
            <>
            <div>-</div>
            <div>-</div>
            </>
            );
        }
        return (
        <>
            <div>{data.commandA_score}</div>
            <div>{data.commandB_score}</div>
        </>);
    }

    return(
        <a class={classname()} href="">
            <div class="match__left">
                <div class="match__status">{status()}</div>
                <div class="match__players">
                    <div class="match-player">
                        <img class="match-player__icon"
                            src={data.commandA_icon} />
                        <span>{data.commandA_name}</span>
                    </div>
                    <div class="match-player">
                        <img class="match-player__icon"
                            src={data.commandB_icon} />
                        <span>{data.commandB_name}</span>
                    </div>
                </div>
            </div>
            <div class="match__score">
                {score()}
            </div>
        </a>
    );
}

export default Match;