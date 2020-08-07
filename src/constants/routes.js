import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../App';
import UserProfile from '../views/UserProfile/UserProfile';
import ListUsers from '../views/ListUsers/ListUsers';
import NotFound from '../views/NotFound/NotFound';

/**
 * Returns Router components which includes all routing logic on the page
 */
const Routes = () => (
  <BrowserRouter>
    <App path="/">
      <Switch>
        <Route exact path="/" render={(props) => <UserProfile {...props} defaultUser="mousamdhakal" />} />
        <Route exact path="/error/notfound" component={NotFound} />
        <Route exact path="/:user_id" component={UserProfile} />
        <Route exact path="/search/:searchText" render={(props) => <ListUsers {...props} actionToDo="search" />} />
        <Route exact path="/:user_id/:people" component={ListUsers} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routes;
