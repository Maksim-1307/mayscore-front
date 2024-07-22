import { useState } from "react";
import { useAppContext } from "../AppContext";

function MenuButton(props){

    const {showMenu, toggleMenu} = useAppContext();
    const [active, setActive] = useState(showMenu);

    function handleClick(){
        setActive(!active);
        toggleMenu();
    }

    const getClass = ()=>{
        if (active) {
            return "burger-button burger-button--active " + props.className;
        } else {
            return "burger-button " + props.className;
        }
    }

    return(
        <button 
            className={getClass()}
            onClick={()=>{handleClick()}}>
            <div> </div>
            <div> </div>
            <div> </div>
        </button>
    );
}

export default MenuButton;