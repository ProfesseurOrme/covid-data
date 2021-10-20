import {
    FaEquals
} from "react-icons/fa";
import {
    ImArrowDownRight,
    ImArrowUpRight
} from "react-icons/im";

 export const checkEvolutionVariation = (evol_color : string, value : string, evol_percentage : string) => {

    const evol_percentageFloat : number = parseFloat(evol_percentage);
    const valueFloat : number = parseFloat(value);

    if(evol_color === "green" && evol_percentageFloat <= 0) {
        return (
            <>
                <ImArrowDownRight style={{ color : `${evol_color}`}}/> {valueFloat} ( {evol_percentageFloat} %)
        </>
    )
    } else if (evol_color === "red" && evol_percentageFloat > 0) {
        return (
            <>
                <ImArrowUpRight style={{ color : `${evol_color}`}}/> {valueFloat} ( +{evol_percentageFloat} %)
        </>
    )
    } else {
        return (
            <>
                <FaEquals /> {valueFloat}
            </>
        )
    }
}