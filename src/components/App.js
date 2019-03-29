import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamShow from './streams/StreamShow';
import StreamEdit from './streams/StreamEdit';
import history from '../history';

// font awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCoffee)

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div className="container">
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/:id" exact component={StreamShow} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} /> 
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;