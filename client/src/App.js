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
  MyPlaylists,
  NotFound,
  PlaylistEditor,
  Profile,
  SearchResults,
  Friends,
  Gifts,
  Homepage,
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

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/account" component={AccountSettings} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/playlists" component={MyPlaylists} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/searchResults" component={SearchResults} />
          <Route exact path="/edit" component={PlaylistEditor} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/gifts" component={Gifts} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
