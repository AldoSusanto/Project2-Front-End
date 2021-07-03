import { BrowserRouter as Router , Route} from 'react-router-dom';
import Home from  './components/Home';
import Result from  './components/Result';
import Play from  './components/Play';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play" exact component={Play} />
      <Route path="/result" exact component={Result} />
    </Router>
  );
}

export default App;
