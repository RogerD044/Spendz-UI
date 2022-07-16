import './App.css';
import Main from './components/Main'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from './components/Detail';
import Trend from './components/Trends/Trend'


function App() {
  return (
    <Router>
      <div >
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/detail" component={Detail}/>
          <Route path="/trends" component={Trend}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
