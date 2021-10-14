import axios from "axios";

const getGlobalStatistics = async () => {
    await axios.get("http://localhost:3001/api/data/statistics/global")
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return {
                code : error.response.status,
                message : error.message
            }
        })
    ;
}

const getDataPerStateAndDepartment = async () => {
    await axios.get("http://localhost:3001/api/data/statistics/incidence-rate")
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return {
                code : error.response.status,
                message : error.message
            }
        })
    ;
}

const getDepartmentsCoordinates = async () => {
    await axios.get("http://localhost:3001/api/data/departments")
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return {
                code : error.response.status,
                message : error.message
            }
        })
}

const getStatesCoordinates = async() => {
    await axios.get("http://localhost:3001/api/data/regions")
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return {
                code : error.response.status,
                message : error.message
            }
        })
    ;
}

export {getGlobalStatistics , getDataPerStateAndDepartment, getStatesCoordinates, getDepartmentsCoordinates};