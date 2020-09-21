import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import SingleRoom from "./components/SingleRoom/Container/SingleRoom";
import "./global.css";

const App = () => (
  <AuthProvider>
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/singleRoom" component={SingleRoom} />
    </Router>
  </AuthProvider>
);

export default App;
