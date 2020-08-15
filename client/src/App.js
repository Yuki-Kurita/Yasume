import React from "react";

import { BrowserRouter as Rouer, Route } from "react-router-dom";
import Join from "./component/Join";
import Chat from "./component/Chat";

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
