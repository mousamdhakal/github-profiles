import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './container/Header/Header';
import UserProfile from './views/UserProfile/UserProfile';
import ListUsers from './views/ListUsers/ListUsers';
import NotFound from './views/NotFound/NotFound';

function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={(props) => <UserProfile {...props} defaultUser="mousamdhakal" />} />
        <Route exact path="/error/notfound" component={NotFound} />
        <Route exact path="/:user_id" component={UserProfile} />
        <Route exact path="/search/:searchText" render={(props) => <ListUsers {...props} actionToDo="search" />} />
        <Route exact path="/:user_id/:people" component={ListUsers} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
