import React from 'react';
import { getData } from '../helpers/agregate';
import Map from "./map/Map";

const App = () => {

    React.useEffect(() => {
        getData();
    })
  return (
      <></>
  );
}

export default App;