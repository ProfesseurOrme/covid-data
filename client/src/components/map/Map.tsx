import React from "react";
import {FrData, getData, GlobalData } from "../../helpers/agregate";
import MapComponent from "./MapComponent";
import {outreMerMetropoleCoordinates} from "../../utils/region-locations";
import  Stats from "../stats/Stats";
import {Card, Container, Row, Col} from "react-bootstrap";
import {ImArrowDownRight, ImArrowUpRight} from "react-icons/im";
import {FaEquals} from "react-icons/fa";

const Map : React.FunctionComponent = () => {

    const [data, setData] = React.useState<GlobalData|any>(null);
    const [loaded, setLoaded ] = React.useState<boolean>(false);

    React.useEffect(() => {
        getData()
            .then((res) => {
                setData(res)
            })
            .then(() => {
                setLoaded(true);
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

    const renderOutreMerMap = () => {
        if(data !== null) {
            const codeInsee =  ["01", "02", "03", "04", "06"];

            let array : FrData[] = [];

            codeInsee.forEach((value) => {
                let obj : FrData | undefined = data.regions.find((item: { code: string; }) => item.code === value);
                if(obj !== undefined)
                {
                    array.push(obj)
                }
            })
            return (
                array.map((region) => {
                    return (
                        outreMerMetropoleCoordinates.map((coordinateData) => {
                            if(region.code === coordinateData.code) {
                                return (
                                    <MapComponent
                                        fixed={false}
                                        title={coordinateData.name}
                                        style={styleOm}
                                        key={region.code}
                                        data={[region]}
                                        center={[coordinateData.coordinates.latitude, coordinateData.coordinates.longitude]}
                                        classNameOM={"cvd_map_om"}
                                        properties={{zoom : coordinateData.properties!!.zoom, minZoom : coordinateData.properties!!.minZoom}}
                                    >
                                    </MapComponent>
                                )
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
                        <MapComponent
                            fixed={true}
                            title={"Metropole"}
                            style={styleFr}
                            key={"fr"}
                            center={[46.22, 2.21]}
                            data={data.departments}
                            properties={{zoom : 5, minZoom : 5}}
                        >
                        </MapComponent>
                        <Col lg={"4"}>
                            <h4 className={"title"}>Stats France</h4>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Taux d'incidence :
                                    </Card.Title>
                                    <Card.Text>
                                        {checkEvolVariation(data.france.incidence_rate.evol_color, parseFloat(data.france.incidence_rate.last_value), parseFloat(data.france.incidence_rate.evol_percentage))}
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
                        {renderOutreMerMap()}
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <Stats data={data}>
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

export default Map;