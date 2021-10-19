import React from "react";
import {
    StateData,
    GeoData
} from "../helpers/IAgregateGeo";
import {
    getDataGeo
} from "../helpers/agregateGeo";
import Map from "./map/Map";
import {
    outreMerMetropoleCoordinates
} from "../utils/region-locations";
import  Stats from "./stats/Stats";
import {
    Card,
    Container,
    Row,
    Col
} from "react-bootstrap";
import {
    ImArrowDownRight,
    ImArrowUpRight
} from "react-icons/im";
import {
    FaEquals
} from "react-icons/fa";
import {
    getGlobalStats,
    getIncidenceRate,
    getPositivesCases,
    getHospitalizations,
    getIntensiveCare,
    getTotalDeath,
    getTotalVaccinated,
    getFirstShotVaccine
} from "../apis/data";
import {
    data,
    states,
    value
} from "../helpers/IData";

type dataCovidState = {
    incidence_rate : data |null,
    positives_cases : data |null,
    hospitalizations : data | null,
    intensive_care : data | null,
    total_death : data | null,
    total_vaccinated : data | null,
    first_shot_vaccine : data | null
}

const Home : React.FunctionComponent = () => {

    const [dataGeo, setDataGeo] = React.useState<GeoData|any>(null);
    const [dataCovid, setDataCovid] = React.useState<dataCovidState>({
        incidence_rate : null,
        positives_cases : null,
        hospitalizations : null,
        intensive_care : null,
        total_death : null,
        total_vaccinated : null,
        first_shot_vaccine : null
    })
    const [loaded, setLoaded ] = React.useState<boolean>(false);

    React.useEffect(() => {
        setAllData()
            .then(() => {
                setLoaded(true)
            })
        ;
    }, [loaded])

    const styleFr = {
        width: "100%",
        minHeight: "60vh"
    }

    const styleOm = {
        width : "100%",
        height : "250px"
    }

    const setAllData = async() => {
        await Promise.all([getIncidenceRate, getPositivesCases, getHospitalizations, getIntensiveCare, getTotalDeath, getTotalVaccinated, getFirstShotVaccine])
            .then(values => {
                values[0] ? setDataCovid((prevState) => ({...prevState, incidence_rate : values[0]})) : setDataCovid((prevState) => ({...prevState, incidence_rate : null}));
                values[1] ? setDataCovid((prevState) => ({...prevState, positives_cases : values[1]})) : setDataCovid((prevState) => ({...prevState, incidence_rate : null}));
                values[2] ? setDataCovid((prevState) => ({...prevState, hospitalizations : values[2]})) : setDataCovid((prevState) => ({...prevState, incidence_rate : null}));
                values[3] ? setDataCovid((prevState) => ({...prevState, intensive_care : values[3]})) : setDataCovid((prevState) => ({...prevState, intesive_care: null}));
                values[4] ? setDataCovid((prevState) => ({...prevState, total_death : values[3]})) : setDataCovid((prevState) => ({...prevState, total_death: null}));
                values[5] ? setDataCovid((prevState) => ({...prevState, total_vaccinated : values[3]})) : setDataCovid((prevState) => ({...prevState, total_vaccinated: null}));
                values[6] ? setDataCovid((prevState) => ({...prevState, first_shot_vaccine : values[3]})) : setDataCovid((prevState) => ({...prevState, first_shot_vaccine: null}));

            })
            .finally(() => {
                getDataGeo()
                    .then((res) => {
                        setDataGeo(res)
                    })
                ;
            })
        ;
    }



    const renderOutreMerMap = (incidenceRate : states[]) => {
        if(dataGeo !== null) {
            const codeInsee =  ["01", "02", "03", "04", "06"];

            let arrayGeo : StateData[] = [];
            let arrayData : states[] = []

            codeInsee.forEach((value) => {
                let objGeo : StateData | undefined = dataGeo.regions.find((item: { code: string; }) => item.code === value);
                if(objGeo !== undefined)
                {
                    arrayGeo.push(objGeo)
                }


            })
            return (
                arrayGeo.map((region) => {
                    return (
                        outreMerMetropoleCoordinates.map((coordinateData) => {
                            if(region.code === coordinateData.code) {
                                let objData : states | undefined = incidenceRate.find((item : {code_level : string}) => item.code_level === region.code);
                                if(objData !== undefined)
                                {
                                    return (

                                        <Map
                                            fixed={false}
                                            title={coordinateData.name}
                                            style={styleOm}
                                            key={region.code}
                                            dataGeo={[region]}
                                            dataIncidence={[objData]}
                                            center={[coordinateData.coordinates.latitude, coordinateData.coordinates.longitude]}
                                            classNameOM={"cvd_map_om"}
                                            properties={{zoom : coordinateData.properties!!.zoom, minZoom : coordinateData.properties!!.minZoom}}
                                        >
                                        </Map>
                                    )
                                }

                            } else {
                                return <></>
                            }
                        })
                    )
                })
            )

        } else {
            return <></>
        }
    }

    const checkEvolVariation = (evol_color : string, value : string, evol_percentage : string) => {

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
            return <FaEquals />
        }
    }

    if(loaded) {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card className={"cvd-card cvd-header"}>
                                <h1 className={"cvd-card__title title"}>Test - Data Covid</h1>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Map
                            fixed={true}
                            title={"Metropole"}
                            style={styleFr}
                            key={"fr"}
                            dataIncidence={dataCovid.incidence_rate!!.departements}
                            center={[46.22, 2.21]}
                            dataGeo={dataGeo.departments}
                            properties={{zoom : 5, minZoom : 5}}
                        >
                        </Map>
                        <Col lg={"3"}>
                            <h4 className={"title"}>Stats France</h4>
                            <Card style={{minHeight : "60vh"}}>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={"3"}>
                            <h4 className={"title"}>Stats France</h4>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Taux d'incidence :
                                    </Card.Title>
                                    <Card.Text>
                                        {checkEvolVariation(dataCovid.incidence_rate!!.france[0].evol_color, dataCovid.incidence_rate!!.france[0].last_value, dataCovid.incidence_rate!!.france[0].evol_percentage)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Cas positifs journaliers :
                                    </Card.Title>
                                    <Card.Text>
                                        {checkEvolVariation(dataCovid.positives_cases!!.france[0].evol_color, dataCovid.positives_cases!!.france[0].last_value, dataCovid.positives_cases!!.france[0].evol_percentage)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Patients hospitalisés :
                                    </Card.Title>
                                    <Card.Text>
                                        {checkEvolVariation(dataCovid.hospitalizations!!.france[0].evol_color, dataCovid.hospitalizations!!.france[0].last_value, dataCovid.hospitalizations!!.france[0].evol_percentage)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Patients en réanimations :
                                    </Card.Title>
                                    <Card.Text>
                                        {checkEvolVariation(dataCovid.intensive_care!!.france[0].evol_color, dataCovid.intensive_care!!.france[0].last_value, dataCovid.intensive_care!!.france[0].evol_percentage)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        {renderOutreMerMap(dataCovid.incidence_rate!!.regions)}
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <Stats data={dataGeo}>
                            </Stats>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Home;