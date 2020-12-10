import React, { useContext } from 'react';
import Axios from 'axios';
import { Button, Tabs, Tab } from 'react-bootstrap';

import { FriendListPopup, MyPlaylistsPopup, SearchResultItem } from '.';

import AddIcon from '@material-ui/icons/Add';
import CallSplitIcon from '@material-ui/icons/CallSplit';

import { UserContext } from '../contexts';

const DiscoverSearch = (props) => {
  const { currentUser } = useContext(UserContext);

  const forkPlaylist = async (playlist) => {
    try {
      const forkRes = await Axios.post('/api/playlist/forkPlaylist', {
        username: currentUser.username,
        playlist,
      });
      console.log(forkRes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h5>Search results for: {props.query}</h5>
      <Tabs>
        <Tab eventKey="playlistsSearch" title="Playlists" className="p-3">
          {props.playlistResults.map((p) => {
            return (
              <SearchResultItem
                key={p.playlistId}
                name={p.playlistName}
                artist={p.ownerUsername}
                thumbnail={p.thumbnail}>
                <Button variant="flat" onClick={() => forkPlaylist(p)}>
                  <CallSplitIcon style={{ color: '#979696' }} />
                </Button>

                <FriendListPopup />
              </SearchResultItem>
            );
          })}
        </Tab>
        <Tab eventKey="songsSearch" title="Songs" className="p-3">
          {props.songResults.map((s) => {
            return (
              <SearchResultItem
                key={s.id.videoId}
                youtubeID={s.id.videoId}
                name={s.snippet.title}
                artist={s.snippet.channelTitle}
                thumbnail={s.snippet.thumbnails.medium.url}>
                <MyPlaylistsPopup>
                  <Button variant="flat">
                    <AddIcon style={{ color: '#979696' }} />
                  </Button>
                </MyPlaylistsPopup>

                <FriendListPopup />
              </SearchResultItem>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default DiscoverSearch;
