import React from 'react';
import Home from './home/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "../i18n/i18n";
import Header from './Header';
import Search from './search/Search';
import {
    getStatistics
} from '../apis/data';
import {
    getDataGeo
} from '../helpers/agregateGeo';
import {
    GeoData
} from '../helpers/IAgregateGeo';
import {
    data
} from '../helpers/IData';

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

const App : React.FunctionComponent = () => {

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
    });

    const [loaded, setLoaded ] = React.useState<boolean>(false);

    React.useEffect(() => {
        setAppData()
            .then(() => {
                setLoaded(true);
            })
    }, [loaded])

    const setAppData = async () => {
        await getStatistics
            .then(res => {
                setDataCovid(res);
            })
        ;

        await getDataGeo()
            .then(res => {
                setDataGeo(res);
            })
        ;
    }

  return (
      <Router>
          <Header />
          {
              (loaded) ?
                  <Switch>
                      <Route exact path={"/"}>
                          <Home dataGeo={dataGeo} dataCovid={dataCovid} />
                      </Route>
                      <Route exact path={"/search"}>
                          <Search dataGeo={dataGeo} dataCovid={dataCovid} />
                      </Route>
                  </Switch>
                  :
                  <></>
          }

      </Router>

  );
}

export default App;