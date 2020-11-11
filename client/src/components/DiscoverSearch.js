import React from 'react';
import { Button, Tabs, Tab } from 'react-bootstrap';
import { FriendListPopup, MyPlaylistsPopup, SearchResultItem } from '.';
import { Add, CallSplit } from '@material-ui/icons';

const DiscoverSearch = (props) => {
  return (
    <div>
      <h5>Search results for: {props.query}</h5>
      <Tabs>
        <Tab eventKey="playlistsSearch" title="Playlists" className="p-3">
          {props.playlistResults.map((p) => {
            return (
              <SearchResultItem key={p.id} name={p.name} artist={p.owner}>
                <Button variant="flat">
                  <CallSplit style={{ color: '#979696' }} />
                </Button>

                <FriendListPopup />
              </SearchResultItem>
            );
          })}
        </Tab>
        <Tab eventKey="songsSearch" title="Songs" className="p-3">
          {props.songResults.map((p) => {
            return (
              <SearchResultItem key={p.id} name={p.name} artist={p.artist}>
                <MyPlaylistsPopup>
                  <Button variant="flat">
                    <Add style={{ color: '#979696' }} />
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
