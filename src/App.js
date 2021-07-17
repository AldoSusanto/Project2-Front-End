import { BrowserRouter as Router , Route} from 'react-router-dom';
import Home from  './HomePage/Home';
import Result from  './ResultPage/Result';
import Play from  './PlayPage/Play';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faUserTie, faTags , faLaptop, faPlay } from '@fortawesome/free-solid-svg-icons'


function App() {
  library.add(fab, faEnvelope, faUserTie, faTags, faLaptop, faPlay) 
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play" exact component={Play} />
      <Route path="/result" exact component={Result} />
    </Router>
  );
}

export default App;
