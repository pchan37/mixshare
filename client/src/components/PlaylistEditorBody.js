import React from 'react';

import { Button, Container, OverlayTrigger } from 'react-bootstrap';
import { PlaylistEditItem, QuickSearchPopup } from './';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';

const PlaylistEditorBody = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <Button variant="flat" href="#">
            <ArrowBackIosIcon className="align-self-center" />
          </Button>

          <h2>Playlist Editor</h2>
        </div>

        <Button variant="flat">
          <SearchIcon className="align-self-center" />
        </Button>
      </div>

      <div className="d-flex flex-row mt-3">
        <div className="d-flex flex-row flex-grow-1 ml-4">
          <h5 className="align-self-center">[Playlist Name]</h5>
          <Button variant="flat">
            <EditIcon className="ml-3" />
          </Button>
        </div>

        <Button variant="flat">
          <HelpOutlineIcon />
        </Button>
        <Button variant="flat">
          <SettingsIcon />
        </Button>
      </div>

      <div>
        <PlaylistEditItem />
        <PlaylistEditItem />
        <PlaylistEditItem />
        <PlaylistEditItem />
        <PlaylistEditItem />
      </div>
    </Container>
  );
};

export default PlaylistEditorBody;
