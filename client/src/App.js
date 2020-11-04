import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  AccountSettings,
  Discover,
  NotFound,
  PlaylistSearch,
  PlaylistEditor,
  Profile,
  Friends,
  ExpandedMusicPlayer,
  Gifts,
  Homepage,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/account" component={AccountSettings} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/playlists" component={PlaylistSearch} />
        <Route exact path="/edit" component={PlaylistEditor} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/fullscreen" component={ExpandedMusicPlayer} />
        <Route exact path="/gifts" component={Gifts} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
