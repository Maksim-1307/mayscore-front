import Leagueslist from "./Leagueslist";

function Sidebar(props) {
    return (
        <div class="sidebar">
            <h2 class="sidebar__title">Лиги</h2>
            <Leagueslist data={props.data}/>
        </div>
    );
}

export default Sidebar;