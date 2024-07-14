import { useLocation } from "react-router-dom";

import footballIcon from "../images/icons/soccer.png";
import hockeyIcon from "../images/icons/hokey.png";
import basketballIcon from "../images/icons/basketball.png";
import volleyballIcon from "../images/icons/voleyball.png";
import tennisIcon from "../images/icons/tennis.png";
import esportsIcon from "../images/icons/cybersport.png";

import { sportsTranslations } from "../helpers/translations";


function Breadcrumbs (props) {
    const location = useLocation();
    const pathData = location.pathname.split("/");

    const navicons = {
        "football": footballIcon,
        "hockey": hockeyIcon,
        "basketball": basketballIcon,
        "volleyball": volleyballIcon,
        "tennis": tennisIcon,
        "esports": esportsIcon,
    }

    let path = "";
    let pathElements = [];
    pathData.forEach((element) => {
        if (!element) return;
        path += "/" + element;
        if (!pathElements.length){
            pathElements.push(
                <a href={path} class="pagination__point pagination__point--parent">
                    <img class="pagination__icon" src={navicons[element]}/>
                    <span class="pagination__text">{sportsTranslations[element]}</span>
                </a>
            );
        } else {
            pathElements.push(
            <><div class="pagination__delmiter">{">"}</div>
            <a href = {path} class="pagination__point">
                <span class="pagination__text">{element}</span>
            </a>
            </>);
        }
    });
    
    return (
        <div class="pagination">
            {pathElements}
        </div>
    );
}

export default Breadcrumbs;