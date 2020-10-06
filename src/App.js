import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import SingleRoom from "./components/SingleRoom/Container/SingleRoom";
import "./global.css";

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/singleRoom" component={SingleRoom} />
  </Router>
);

export default App;
