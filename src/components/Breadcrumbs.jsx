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
    let pathData = location.pathname.split("/");

    const data = props.data;
    if (data) pathData = data;

    const navicons = {
        "football": footballIcon,
        "hockey": hockeyIcon,
        "basketball": basketballIcon,
        "volleyball": volleyballIcon,
        "tennis": tennisIcon,
        "esports": esportsIcon,
    }

    const Wrapper = (props) => {
        const {children, ...rest} = props; 
        if (data) {
            return (
                <div {...rest}>
                    {children}
                </div>
            );
        } else {
            return (
                <a href={path} {...rest}>
                    {children}
                </a>
            );
        }
    }

    let path = "";
    let pathElements = [];
    pathData.forEach((element) => {
        if (!element) return;
        path += "/" + element;
        if (!pathElements.length){
            const icon = () => { 
                const iconpath = navicons[element]
                if (iconpath) return (<img class="pagination__icon" src={iconpath} />);
            };
            const span = () => {
                const name = sportsTranslations[element];
                if (name) return (<span class="pagination__text">{name}</span>);
                return (<span class="pagination__text">{element}</span>);
            }
            pathElements.push(
                <Wrapper class="pagination__point pagination__point--parent">
                    {icon()}
                    {span()}
                </Wrapper>
            );
        } else {
            pathElements.push(
            <>
            <div class="pagination__delmiter">{">"}</div>
            <Wrapper href = {path} class="pagination__point">
                <span class="pagination__text">{element}</span>
            </Wrapper>
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