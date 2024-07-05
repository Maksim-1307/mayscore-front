import Sidebar from "./Sidebar";
import Scoreboard from "./Scoreboard";

function Sport (props) {
    return(
        <section class="main-section">
            <div className='container'>
                <Sidebar />
                <div className="content">
                    <Scoreboard />
                </div>
            </div>
        </section>
    );
}

export default Sport;