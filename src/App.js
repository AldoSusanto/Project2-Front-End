import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Result from "./ResultPage/Result";
import Decrypt from "./DecryptPage/Decrypt";
import Play from "./PlayPage/Play";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import "semantic-ui-css/semantic.min.css";

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);

function App() {
  library.add(...iconList);

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play" exact component={Play} />
      <Route path="/result" exact component={Result} />
      <Route path="/decrypt" exact component={Decrypt} />
    </Router>
  );
}

export default App;
