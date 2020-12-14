import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import Axios from 'axios';

import './custom.scss';

import {
  CurrentEditPlaylistContext,
  CurrentlyPlayingContext,
  ProfileContext,
  UserContext,
} from './contexts';
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

async function isProtected(to, from, next) {
  if (to.meta.auth === true) {
    const { data } = await Axios.get('/api/auth/user');
    const { username } = data;
    if (username !== undefined && username !== null) {
      next();
    }
    next.redirect({
      pathname: '/',
      state: { referrer: from.location.pathname },
    });
  } else {
    next();
  }
}

async function isNotProtected(to, _from, next) {
  const toPathname = to.location.pathname;
  if (toPathname !== '/') {
    next();
  }

  const { data } = await Axios.get('/api/auth/user');
  const { username } = data;
  if (username !== undefined && username !== null) {
    next.redirect('/discover');
  }
  next();
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState({
    song: '',
    playlist: '',
    repeat: false,
    shuffle: false,
    shuffledList: [],
    opts: {
      playerVars: {
        controls: 1,
        autoplay: 1,
        loop: 0,
        playlist: '',
      },
    },
  });
  const [currentEditPlaylist, setCurrentEditPlaylist] = useState(null);
  const [currentProfile, setCurrentProfile] = useState('');

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
    <ProfileContext.Provider value={{ currentProfile, setCurrentProfile }}>
      <CurrentEditPlaylistContext.Provider
        value={{ currentEditPlaylist, setCurrentEditPlaylist }}>
        <CurrentlyPlayingContext.Provider
          value={{ currentlyPlaying, setCurrentlyPlaying }}>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Router>
              <GuardProvider
                guards={[isProtected, isNotProtected]}
                loading={() => <h1>Loading...</h1>}
                error={() => <h1>Not Found</h1>}>
                <Switch>
                  <GuardedRoute exact path="/" component={HomePage} />
                  <GuardedRoute
                    exact
                    path="/account"
                    component={AccountSettingsPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/discover"
                    component={DiscoverPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/playlists"
                    component={MyPlaylistsPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/profile"
                    component={ProfilePage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/searchResults"
                    component={SearchResultsPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/edit"
                    component={PlaylistEditorPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/friends"
                    component={FriendsPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute
                    exact
                    path="/gifts"
                    component={GiftsPage}
                    meta={{ auth: true }}
                  />
                  <GuardedRoute path="/404" component={NotFoundPage} />
                  <Redirect to="/404" />
                </Switch>
              </GuardProvider>
            </Router>
          </UserContext.Provider>
        </CurrentlyPlayingContext.Provider>
      </CurrentEditPlaylistContext.Provider>
    </ProfileContext.Provider>
  );
}

export default App;
