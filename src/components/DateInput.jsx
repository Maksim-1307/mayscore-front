import calenderIcon from "../images/icons/calender.png";
import {useScoreboard} from "../components/Scoreboard";
import { useEffect, useState } from "react";

function DateInput () {

    const {date, setDate} = useScoreboard();

    const changeDate = (bias) => {
        setDate(date + bias);
    }

    const getFormatDate = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + date);

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // добавляем ноль перед месяцем, если он однозначный
        const day = String(currentDate.getDate()).padStart(2, '0'); // добавляем ноль перед днем, если он однозначный

        return `${year}-${month}-${day}`;
    };

    if (date === null) setDate(0);


    return(
        <div class="date-input">
            <button class="button-1" onClick={() => changeDate(-1)}> {"<"} </button>
            <div class="button-1 date-input__middle">
                <label class="date-input__label" for="date-input">
                    <img class="date-input__icon" src={calenderIcon} />
                </label>
                <input
                    class="date-input__input" type="date" id="date-input"
                    name="date-input" value={getFormatDate()} />
            </div>
            <button class="button-1" onClick={() => changeDate(1)} >{">"}</button>
        </div>
    );
}

export default DateInput;