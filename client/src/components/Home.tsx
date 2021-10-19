import React from "react";
import {StateData, GeoData } from "../helpers/IAgregateGeo";
import {getDataGeo} from "../helpers/agregateGeo"
import Map from "./map/Map";
import {outreMerMetropoleCoordinates} from "../utils/region-locations";
import  Stats from "./stats/Stats";
import {Card, Container, Row, Col} from "react-bootstrap";
import {ImArrowDownRight, ImArrowUpRight} from "react-icons/im";
import {FaEquals} from "react-icons/fa";
import { getIncidenceRate, getPositivesCases } from "../apis/data";
import {data, states, value} from "../helpers/IData"

const Home : React.FunctionComponent = () => {

    const [dataGeo, setDataGeo] = React.useState<GeoData|any>(null);
    const [incidenceRate, setIncidenceRate] = React.useState<data|null>(null);
    const [positivesCases, setPositivesCases] = React.useState<data|null>(null);
    const [loaded, setLoaded ] = React.useState<boolean>(false);

    React.useEffect(() => {
        getDataGeo()
            .then((res) => {
                setDataGeo(res)
            })
        getDataCovid()
            .then(() => {
                setLoaded(true)
            })
    }, [loaded])

    const styleFr = {
        width: "100%",
        minHeight: "60vh"
    }

    const styleOm = {
        width : "100%",
        height : "250px"
    }

    const getDataCovid = async() => {
        await Promise.all([getIncidenceRate, getPositivesCases])
            .then(values => {
                values[0] ? setIncidenceRate(values[0]) : setIncidenceRate(null);
                values[1] ? setPositivesCases(values[1]) : setPositivesCases(null)
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

    const checkEvolVariation = (evol_color : string, value : number, evol_percentage : number) => {

        if(evol_color === "green" && evol_percentage <= 0) {
            return (
                <>
                    <ImArrowDownRight style={{ color : `${evol_color}`}}/> {value} ( - {evol_percentage} %)
                </>
            )
        } else if (evol_color === "red" && evol_percentage > 0) {
            return (
                <>
                    <ImArrowUpRight style={{ color : `${evol_color}`}}/> {value} ( + {evol_percentage} %)
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
                            dataIncidence={incidenceRate!!.departements}
                            center={[46.22, 2.21]}
                            dataGeo={dataGeo.departments}
                            properties={{zoom : 5, minZoom : 5}}
                        >
                        </Map>
                        <Col lg={"4"}>
                            <h4 className={"title"}>Stats France</h4>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Taux d'incidence :
                                    </Card.Title>
                                    <Card.Text>
                                        {/*checkEvolVariation(dataGeo.france.incidence_rate.evol_color, parseFloat(dataGeo.france.incidence_rate.last_value), parseFloat(dataGeo.france.incidence_rate.evol_percentage))*/}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Taux d'incidence
                                    </Card.Title>
                                    <Card.Text>
                                        Jeff Atwood
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Taux d'incidence
                                    </Card.Title>
                                    <Card.Text>
                                        Jeff Atwood
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Taux d'incidence
                                    </Card.Title>
                                    <Card.Text>
                                        Jeff Atwood
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        {renderOutreMerMap(incidenceRate!!.regions)}
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