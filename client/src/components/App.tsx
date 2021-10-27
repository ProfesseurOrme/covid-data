import React from 'react';
import Home from './home/Home';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "../i18n/i18n";
import Header from './Header';
import Search from './search/Search.jsx';

const App = () => {

  return (
      <Router>
          <Header />
          <Switch>
              <Route exact path={"/"}>
                    <Home />
              </Route>
              <Route exact path={"/search"}>
                    <Search />
              </Route>
          </Switch>
      </Router>

  );
}

export default App;