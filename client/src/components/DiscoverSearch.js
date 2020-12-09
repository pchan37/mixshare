import React from 'react';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { FriendListPopup, MyPlaylistsPopup, SearchResultItem } from '.';
import AddIcon from '@material-ui/icons/Add';

const DiscoverSearch = (props) => {
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
                artist={p.ownerUsername}>
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
        <Tab eventKey="songsSearch" title="Songs" className="p-3">
          {props.songResults.map((p) => {
            return (
              <SearchResultItem
                key={p.id.videoId}
                youtubeID={p.id.videoId}
                name={p.snippet.title}
                artist={p.snippet.channelTitle}
                thumbnail={p.snippet.thumbnails.medium.url}>
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
