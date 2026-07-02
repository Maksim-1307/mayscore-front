import { Link, useLocation } from "react-router-dom";

import footballIcon from "../images/icons/soccer.png";
import hockeyIcon from "../images/icons/hokey.png";
import basketballIcon from "../images/icons/basketball.png";
import volleyballIcon from "../images/icons/voleyball.png";
import tennisIcon from "../images/icons/tennis.png";
import esportsIcon from "../images/icons/cybersport.png";
import MenuButton from "./MenuButton";
import ContactButton from "./ContactButton";

function Header() {

    const location = useLocation();
    const sport = location.pathname.split("/")[1];

    const navlist = {
        "football": "футбол",
        "hockey": "хоккей",
        "basketball": "баскетбол",
        "volleyball": "волейбол",
        "tennis": "теннис",
        "esports": "киберспорт",
    }
    const navicons = {
        "football": footballIcon,
        "hockey": hockeyIcon,
        "basketball": basketballIcon,
        "volleyball": volleyballIcon,
        "tennis": tennisIcon,
        "esports": esportsIcon,
    }

    const isCurrent = (name) => {
        return Number(sport == name);
    }

    const navListElemens = () => { 
        let elements = [];
        for (const [key, value] of Object.entries(navlist)) {
            elements.push((
                <a href={"/" + key}  className="nav-list__point nav-list__point--current">
                    <img className="nav-list__icon" src={navicons[key]} />
                    <span className="nav-list__text">{value}</span>
                    <div className="nav-list__line" style={{"opacity": isCurrent(key)}}></div>
                </a>
            ));
        }
        return elements;
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__top"><a className="logo header__logo" href="/">mayscor<span className="green">.ru</span></a>
                <MenuButton className="header__burger-button"/>
                </div>
                <div className="header__bottom">
                    <div className="nav-list header__nav-list">
                        {navListElemens()}
                        <ContactButton />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;