import axios from "axios";

const getGlobalStatistics = async () => {
    await axios.get("http://localhost:3001/api/data/global-statistics")
        .then((res) => {
            res.data
        })
    ;
}

const agregateDataPerStateAndDepartment = async () => {
    await axios.get("http://localhost:3001/api/data/incidence-rate")
        .then((res) => {
            return res.data
        })
    ;
}

export {getGlobalStatistics , agregateDataPerStateAndDepartment};