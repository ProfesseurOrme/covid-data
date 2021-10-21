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
    getIncidenceRate,
    getPositivesCases,
    getHospitalizations,
    getIntensiveCare,
    getTotalDeath,
    getTotalVaccinated,
    getFirstShotVaccine,
    getTotalHomeReturns
} from "../apis/data";
import {
    data,
    states
} from "../helpers/IData";
import StatsColumn from "./stats/StatsColumn";
import StatsTabLists from "./stats/tabs/StatsTabLists";
import StatsTabCharts from "./stats/tabs/StatsTabCharts";

export type dataCovidState = {
    incidence_rate : data |null,
    positives_cases : data |null,
    hospitalizations : data | null,
    intensive_care : data | null,
    total_death : data | null,
    total_vaccinated : data | null,
    first_shot_vaccine : data | null,
    total_home_returns : data | null
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
        first_shot_vaccine : null,
        total_home_returns : null
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
        minHeight: "70vh"
    }

    const styleOm = {
        width : "100%",
        height : "250px"
    }

    const setAllData = async() => {
        await Promise.all([getIncidenceRate, getPositivesCases, getHospitalizations, getIntensiveCare, getTotalDeath, getTotalVaccinated, getFirstShotVaccine, getTotalHomeReturns])
            .then(values => {
                values[0] ? setDataCovid((prevState) => ({...prevState, incidence_rate : values[0]})) : setDataCovid((prevState) => ({...prevState, incidence_rate : null}));
                values[1] ? setDataCovid((prevState) => ({...prevState, positives_cases : values[1]})) : setDataCovid((prevState) => ({...prevState, incidence_rate : null}));
                values[2] ? setDataCovid((prevState) => ({...prevState, hospitalizations : values[2]})) : setDataCovid((prevState) => ({...prevState, incidence_rate : null}));
                values[3] ? setDataCovid((prevState) => ({...prevState, intensive_care : values[3]})) : setDataCovid((prevState) => ({...prevState, intesive_care: null}));
                values[4] ? setDataCovid((prevState) => ({...prevState, total_death : values[4]})) : setDataCovid((prevState) => ({...prevState, total_death: null}));
                values[5] ? setDataCovid((prevState) => ({...prevState, total_vaccinated : values[5]})) : setDataCovid((prevState) => ({...prevState, total_vaccinated: null}));
                values[6] ? setDataCovid((prevState) => ({...prevState, first_shot_vaccine : values[6]})) : setDataCovid((prevState) => ({...prevState, first_shot_vaccine: null}));
                values[7] ? setDataCovid((prevState) => ({...prevState, total_home_returns : values[7]})) : setDataCovid((prevState) => ({...prevState, total_home_returns: null}));

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
                                        />
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
                            title={"Metropole (Taux d'incidence)"}
                            style={styleFr}
                            key={"fr"}
                            dataIncidence={dataCovid.incidence_rate!!.departements}
                            center={[46.72, 2.21]}
                            dataGeo={dataGeo.departments}
                            properties={{zoom : 6, minZoom : 6}}
                        />
                        <StatsColumn dataCovid={dataCovid!!} />
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
                            <Stats global={false} title={"Évolution des données"} headerColor={"#e76f51"} component={<StatsTabCharts dataGeo={dataGeo} dataCovid={dataCovid}/>}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Stats global={false} title={"Statistiques globales"} headerColor={"#2a9d8f"} component={<StatsTabLists dataGeo={dataGeo} dataCovid={dataCovid}/>}/>
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