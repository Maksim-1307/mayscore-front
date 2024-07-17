import { useEffect } from "react";
import { statusTranslations } from "../helpers/translations";

function MatchCard(props) {
    const data = props.data;

    if (!data) return;
    if (data.blockType != "match") return;

    const classname = () => {
        if (data.status == 2) return "match match--live";
        return "match";
    }   

    const status = () => {

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
        <a class={classname()} href={"/match/" + props.data.id}>
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

export default MatchCard;