import './App.css';
import React, { useState } from 'react';
import News from './components/News';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import NavbarComponent from './components/Navbar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const pageSize = 12;
  const country = "us";
  return (
    <div>
      <Router>
        <NavbarComponent />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />

        <Switch>
          <Route exact path="/">
            <News pageSize={pageSize} key="general" country={country} category="general" setProgress={setProgress} />
          </Route>
          <Route exact path="/general">
            <News pageSize={pageSize} key="general" country={country} category="general" setProgress={setProgress} />
          </Route>
          <Route exact path="/business">
            <News pageSize={pageSize} key="business" country={country} category="business" setProgress={setProgress} />
          </Route>
          <Route exact path="/entertainment">
            <News pageSize={pageSize} key="entertainment" country={country} category="entertainment" setProgress={setProgress} />
          </Route>
          <Route exact path="/health">
            <News pageSize={pageSize} key="health" country={country} category="health" setProgress={setProgress} />
          </Route>
          <Route exact path="/science">
            <News pageSize={pageSize} key="science" country={country} category="science" setProgress={setProgress} />
          </Route>


          <Route exact path="/sports">
            <News pageSize={pageSize} key="sports" country={country} category="sports" setProgress={setProgress} />
          </Route>
          <Route exact path="/technology">
            <News pageSize={pageSize} key="technology" country={country} category="technology" setProgress={setProgress} />
          </Route>

        </Switch>

      </Router>
    </div>
  )
}

export default App;