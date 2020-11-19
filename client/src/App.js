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
  AccountSettingsPage,
  DiscoverPage,
  FriendsPage,
  GiftsPage,
  HomePage,
  MyPlaylistsPage,
  NotFoundPage,
  PlaylistEditorPage,
  ProfilePage,
  SearchResultsPage,
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
          <Route exact path="/" component={HomePage} />
          <ProtectedRoute
            exact
            path="/account"
            component={AccountSettingsPage}
          />
          <ProtectedRoute exact path="/discover" component={DiscoverPage} />
          <ProtectedRoute exact path="/playlists" component={MyPlaylistsPage} />
          <ProtectedRoute exact path="/profile" component={ProfilePage} />
          <ProtectedRoute
            exact
            path="/searchResults"
            component={SearchResultsPage}
          />
          <ProtectedRoute exact path="/edit" component={PlaylistEditorPage} />
          <ProtectedRoute exact path="/friends" component={FriendsPage} />
          <ProtectedRoute exact path="/gifts" component={GiftsPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
