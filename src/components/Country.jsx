import { useParams } from "react-router-dom";

function Country () {
    const {country} = useParams();
    return (country);
}

export default Country;