import React from "react";
import {
    Card,
    Col,
    Container,
    Row
} from "react-bootstrap";
import {
    StateData
} from "../../helpers/IAgregateGeo";
import Map from "../map/Map";
import {
    Data
} from "./Search";
import SearchColumnStats from "./SearchColumnStats";

type SearchResultProps = {
    dataResult : ISearchResult
}

export type ISearchResult = {
    region_data: Data,
    region_geo : StateData,
    location : {
        name: string,
        city_code: string,
        coordinates_point: [ number, number],
        center : [number, number]
    }
}

const style = {
    width : "100%",
    height : "350px"
}

const SearchResult : React.FunctionComponent<SearchResultProps> = (props) => {

    return (
        <Container fluid>
            <Row>
                <Col lg={6}>
                    {
                        <Map
                            fixed={false}
                            title={`${props.dataResult.location.name} - (${props.dataResult.location.city_code}) - ${props.dataResult.region_geo.name}`}
                            style={style}
                            key={props.dataResult.location.city_code}
                            dataGeo={[props.dataResult.region_geo]}
                            dataIncidence={[props.dataResult.region_data.incidence_rate]}
                            center={props.dataResult.location.center}
                            classNameOM={"cvd_map_om"}
                            properties={{zoom : 6, minZoom : 6}}
                        />
                    }

                    <Card className={"cvd-stats"}>
                    </Card>
                </Col>
                <SearchColumnStats dataCovid={props.dataResult.region_data}/>
            </Row>
        </Container>
    )
}

export default SearchResult;