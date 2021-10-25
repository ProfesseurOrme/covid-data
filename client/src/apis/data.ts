import axios from "axios";
import {
    dataCovidState
} from "../components/Home";

export const getStatistics = axios.get<dataCovidState>("http://localhost:3001/api/statistics")
    .then((res) => {
        return res.data;
    })
;
