import React from "react";
import {
    ISearchFeatures
} from "../../apis/search";

type SearchResultProps = {
    location : ISearchFeatures
}

const SearchResult : React.FunctionComponent<SearchResultProps> = (props) => {
    return (
        <>{props.location.properties.city}</>
    )
}

export default SearchResult;