import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import homePage from "./component/homePage";
import addCustomer from "./component/addCustomer";
import editCustomer from "./component/editCustomer";
import NavBar from "./component/NavBar";
import searchPage from "./component/searchPage";
class App extends Component {
  render(){

  return (
    <div className="App">
        <Router>
          <NavBar />
              <Switch>
                  <Route path="/" exact component={homePage} />
                  <Route path="/addCustomer" exact component={addCustomer} />
                  <Route path="/editCustomer" exact component={editCustomer} />
                  <Route path="/searchPage" exact component={searchPage} />
              </Switch>
        </Router>
    </div>
  );
}
}
export default App;
