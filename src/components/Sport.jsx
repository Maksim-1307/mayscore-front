import Sidebar from "./Sidebar";
import Scoreboard from "./Scoreboard";
import { useLocation, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import League from "./League";
import Country from "./Country"


function Sport (props) {
    const {sport} = useParams();
    return(
        <section class="main-section">
            <div className='container'>
                <Sidebar />
                <div className="content">
                    <Scoreboard/>
                </div>
            </div>
        </section>
    );
}

export default Sport;