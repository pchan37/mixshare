import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContext } from './contexts';
import {
  AccountSettings,
  Discover,
  Friends,
  Gifts,
  Homepage,
  MyPlaylists,
  NotFound,
  PlaylistEditor,
  Profile,
  SearchResults,
} from './pages';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await Axios.get('/api/auth/user');
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsername();
  }, []);

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return currentUser?.username !== null &&
            currentUser?.username !== undefined ? (
            <Component {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/account" component={AccountSettings} />
          <ProtectedRoute exact path="/discover" component={Discover} />
          <ProtectedRoute exact path="/playlists" component={MyPlaylists} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/searchResults"
            component={SearchResults}
          />
          <ProtectedRoute exact path="/edit" component={PlaylistEditor} />
          <ProtectedRoute exact path="/friends" component={Friends} />
          <ProtectedRoute exact path="/gifts" component={Gifts} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
