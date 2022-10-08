import { Route } from "react-router-dom";

import Home from "./components/Home";
import News from "./components/News";

import "./App.css";

function App() {
  return (
    <h1>
      <Route path='/' component={Home} />
      <Route path='/news/:id' component={News} />
    </h1>
  );
}

export default App;
