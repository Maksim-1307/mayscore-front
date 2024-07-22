import { useAppContext } from "../AppContext";
import Leagueslist from "./Leagueslist";

function Sidebar(props) {

    const {showMenu} = useAppContext();

    return (
        <div class={showMenu ? "sidebar sidebar--active" : "sidebar"}>
            <h2 class="sidebar__title">Лиги</h2>
            <Leagueslist data={props.data}/>
        </div>
    );
}

export default Sidebar;