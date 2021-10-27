import React, {Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { ISearchFeatures } from "../../apis/search";

type SearchSuggestionsProps = {
    location : ISearchFeatures,
    setLocation : Dispatch<SetStateAction<ISearchFeatures | undefined>>
}

const SearchSuggestion : React.FunctionComponent<SearchSuggestionsProps> = (props) => {
    return (
        <div className={"d-grid gap-2"}>
            <Button
                variant={"Light"}
                size={"lg"}
                style={{
                  margin : ".5rem",
                  textAlign: "left"
                }}
                onClick={() => props.setLocation(props.location)}
            >
                <strong>{props.location.properties.city}</strong>
                <br/>
                <p style={{marginBottom : "0"}}>{props.location.properties.context}. {props.location.properties.citycode}</p>
            </Button>
        </div>
    )
}

export default SearchSuggestion;