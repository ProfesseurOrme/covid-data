import axios from "axios";
import {
    dataCovidState
} from "../components/App";

export const getStatistics = axios.get<dataCovidState>("http://localhost:3001/api/statistics")
    .then((res) => {
        return res.data;
    })
;
