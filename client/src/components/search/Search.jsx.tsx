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
    search,
    ISearchFeatures
} from "../../apis/search";
import SearchResult from "./SearchResult";
import SearchSuggestion from "./SearchSuggestion";

type SearchesState = {
    searchData :  ISearchFeatures[] | [],
    loaded : boolean | null
}

const Search : React.FunctionComponent = () => {

    const defaultState = {
        searchData : [],
        loaded : null
    }

    const [searches, setSearches] = React.useState<SearchesState>(defaultState);
    const [location, setLocation] = React.useState<ISearchFeatures | undefined>(undefined);


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

    const cleanUpSearch = () : void => {
        setSearches(defaultState);
        setLocation(undefined);
    }

    console.log(searches)

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
                                        Recherchez vos indicateurs locaux
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
                                                    Recherche de statistiques par municipalité
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
                                                                <strong>Aucun résultats</strong>
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
                                        Réinitialiser la recherche
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <SearchResult location={location}/>
                </>

        }
        </>
    )
}

export default Search;