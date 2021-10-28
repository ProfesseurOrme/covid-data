import React from "react";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row
} from "react-bootstrap";
import {
    useTranslation
} from "react-i18next";
import {
    search,
    ISearchFeatures
} from "../../apis/search";
import {
    GeoData,
    StateData
} from "../../helpers/IAgregateGeo";
import {
    states
} from "../../helpers/IData";
import {
    dataCovidState
} from "../App";
import Stats from "../stats/Stats";
import StatsSearch from "../stats/tabs/StatsSearch";
import SearchResult, {
    ISearchResult
} from "./SearchResult";
import SearchSuggestion from "./SearchSuggestion";

type SearchState = {
    searchData :  ISearchFeatures[] | [],
    loaded : boolean | null
}

type SearchProps = {
    dataCovid : dataCovidState,
    dataGeo : GeoData
}

export type Data = {
    incidence_rate : states,
    positives_cases : states,
    hospitalizations : states,
    intensive_care : states,
    total_vaccinated : states,
    first_shot_vaccine : states
}

const Search : React.FunctionComponent<SearchProps> = (props) => {

    const defaultState = {
        searchData : [],
        loaded : null
    }

    const [searches, setSearches] = React.useState<SearchState>(defaultState);
    const [location, setLocation] = React.useState<ISearchFeatures | undefined>(undefined);

    const cleanUpSearch = () : void => {
        setSearches(defaultState);
        setLocation(undefined);
    }

    const {t} = useTranslation();

    const handleSearch = async (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const value : string = event.target.value;
        if(value.length >=  1) {
            setSearches((prevState => ({ ...prevState, loaded: false})))
            await search(value)
                .then((res) => {
                    setSearches((prevState => ({ ...prevState, searchData: res.features})))
                })
                .finally(() => {
                    setSearches((prevState => ({ ...prevState, loaded: true})))
                })
            ;
        } else {
            setSearches((prevState => ({ ...prevState, loaded: null})))
        }
    }

    const seekCovidData = (state : StateData, dataCovid : dataCovidState) => {
        let newObj : Data | any = {};
        Object.entries(dataCovid).forEach(([key, datas]) =>  {

            datas!!.regions.forEach((data) => {
                if(state.code === data.code_level) {
                    newObj = {
                        ...newObj,
                        [key]: data,
                    }
                }
            })
        });
        return newObj;
    }

    const splitLocation = (location :string) : string[] => {

        const reg = new RegExp(", ", "g");
        return location.split(reg);
    }

    const getRegionName = (location : ISearchFeatures) : string => {

        const locationInfos: string[] = splitLocation(location.properties.context);

        return (locationInfos.length === 3) ? locationInfos[2] : locationInfos[1]
    }

    const seekData = () : ISearchResult | undefined => {

        if(typeof location !== "undefined") {

            const regionName = getRegionName(location);

            const region: StateData | undefined = props.dataGeo.regions.find((item: { name: string }) => item.name === regionName)
            return {
                region_data: seekCovidData(region!!, props.dataCovid),
                region_geo : region!!,
                location : {
                    name: location.properties.name,
                    city_code: location.properties.postcode,
                    coordinates_point: [ location.properties.x, location.properties.y ],
                    center : [region!!.coordinates.latitude, region!!.coordinates.longitude]
                }
            }
        } else {
            return undefined;
        }
    }

    return (
        <>
        {
            (typeof location === "undefined") ?
                <>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Card className={"cvd-stats"}>
                                    <Card.Title className={"mx-4 mt-4"}>
                                        {t("search.field_search.title")}
                                    </Card.Title>
                                    <FloatingLabel
                                        controlId={"floatingInput"}
                                        label={"Entrez une ville"}
                                        className={"m-4"}
                                    >
                                        <Form.Control
                                            type={"search"}
                                            placeholder={"Tapez votre recherche"}
                                            onChange={handleSearch}
                                        />
                                    </FloatingLabel>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    {
                        (searches.loaded !== null && typeof searches.loaded === "boolean")  ?
                            (searches.loaded) ?
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <Card className={"cvd-stats"}>
                                                <Card.Title className={"mx-4 mt-4"}>
                                                    {t("search.results.title")}
                                                </Card.Title>
                                                <Card.Body>
                                                    {
                                                        (searches.searchData.length !== 0) ?

                                                            searches.searchData.map((location : ISearchFeatures, key : number) => {
                                                                return (
                                                                    <SearchSuggestion key={key} location={location} setLocation={setLocation}/>
                                                                )
                                                            })
                                                            :
                                                            <Card.Title className={"mx-4 mb-4"}>
                                                                <strong>{t("search.results.no_results")}</strong>
                                                            </Card.Title>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                                :
                                <></>
                            :
                            <></>
                    }
                </>
                :
                <>
                    <Container fluid>
                        <Row>
                            <Col className={"cvd-stats-columns"} lg={"3"}>
                                <div className="mb-4">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={cleanUpSearch}
                                    >
                                        {t("search.results.reset")}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <SearchResult dataResult={seekData()!!} />
                    <Container fluid>
                        <Row>
                            <Col>
                                <Stats global={false} title={`${t("search.results.label_result")} : ${getRegionName(location)}`}headerColor={"#e76f51"} component={<StatsSearch dataCovid={seekData()!!}/>}/>
                            </Col>
                        </Row>
                    </Container>
                </>

        }
        </>
    )
}

export default Search;