
import './App.css';

import { useSelector } from 'react-redux';

import Welcome from './components/Welcome/Welcome';
import Problem from './components/Problem/Problem';
import Result from './components/Result/Result';

import { Switch, Route } from "react-router-dom";


function App() {


  const isQuizRunning = useSelector(state => state.isQuizRunning)

  return (

    <div className="App">
      <Switch>

        <Route path="/quiz" exact>
          {isQuizRunning ?
            <Problem />
            :
            <Result />
          }
        </Route>

        <Route path="/" >
          <Welcome />
        </Route>
      </Switch>
    </div>



  );
}

export default App;
