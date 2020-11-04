import React from 'react';
import { Button, Container, Form, Tabs, Tab } from 'react-bootstrap';

import { SearchResultItem } from '.';
import AddIcon from '@material-ui/icons/Add';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import SearchIcon from '@material-ui/icons/Search';
import data from '../placeholders/data';

const SearchResultBody = (props) => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row mb-2">
        <h2>Discover</h2>
        <Container fluid className="d-flex justify-content-end">
          <Form className="d-flex flex-row">
            <Form.Control placeholder="Search" />
            <span>
              <Button href="/searchResults" variant="flat">
                <SearchIcon />
              </Button>
            </span>
          </Form>
        </Container>
      </div>

      <Tabs>
        <Tab eventKey="playlistsSearch" title="Playlists" className="p-3">
          <SearchResultItem>
            <CallSplitIcon />
            <CardGiftcardIcon />
          </SearchResultItem>
        </Tab>
        <Tab eventKey="songsSearch" title="Songs" className="p-3">
          {data.songs.map((p) => {
            return (
              <SearchResultItem key={p.id} name={p.name} artist={p.artist}>
                <AddIcon />
                <CardGiftcardIcon />
              </SearchResultItem>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default SearchResultBody;
