
function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__top"><a className="logo header__logo" href="#">mayscor</a><button
                    className="burger-button header__burger-button">
                    <div> </div>
                    <div> </div>
                    <div> </div>
                </button></div>
                <div className="header__bottom">
                    <div className="nav-list header__nav-list"><button className="nav-list__point nav-list__point--current"><img
                        className="nav-list__icon" src="images/icons/soccer.png"/><span
                            className="nav-list__text">футбол</span>
                        <div className="nav-list__line"></div>
                    </button><button className="nav-list__point"><img className="nav-list__icon"
                        src="images/icons/hokey.png"/><span className="nav-list__text">хоккей</span>
                        <div className="nav-list__line"></div>
                        </button><button className="nav-list__point"><img className="nav-list__icon"
                            src="images/icons/voleyball.png"/><span className="nav-list__text">волейбол</span>
                            <div className="nav-list__line"></div>
                        </button><button className="nav-list__point"><img className="nav-list__icon"
                            src="images/icons/basketball.png"/><span className="nav-list__text">баскетбол</span>
                            <div className="nav-list__line"></div>
                        </button><button className="nav-list__point"><img className="nav-list__icon"
                            src="images/icons/tennis.png"/><span className="nav-list__text">теннис</span>
                            <div className="nav-list__line"></div>
                        </button><button className="nav-list__point"><img className="nav-list__icon"
                            src="images/icons/cybersport.png" /><span className="nav-list__text">киберспорт</span>
                            <div className="nav-list__line"></div>
                        </button></div>
                </div>
            </div>
        </header>
    );
}

export default Header;