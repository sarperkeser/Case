import "./App.css";
import React from "react";
import Detail from "./Detail";
import { Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
  let id = localStorage.getItem("id");
  let path = "/Detail" + "/" + id;
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route path={path} component={Detail}></Route>
      </Switch>
    </div>
  );
}

export default App;
