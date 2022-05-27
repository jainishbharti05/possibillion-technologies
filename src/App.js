import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import InputForm from "./components/InputForm";
import PlayMedia from "./components/PlayMedia";
import ShowList from "./components/ShowList";
import Header from "./Header";
 
const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" exact component={InputForm} />
        <Route path="/list" component={ShowList} />
        <Route path="/play/:id" component={PlayMedia} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
