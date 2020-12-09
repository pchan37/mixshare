import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import {
  Button,
  Col,
  Container,
  Form,
  Image,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';

import { PlaylistEditItem } from './';
import { CurrentEditPlaylistContext } from '../contexts';

const HelpTooltip = (
  <Popover>
    <Popover.Content className="mr-2">
      <p>
        Helpful Tip: Click and drag songs to rearrange the order of your
        playlist!
      </p>
    </Popover.Content>
  </Popover>
);

const SettingsPopup = () => {
  const [mixtapeChecked, setMixtapeChecked] = useState(false);
  const [publicChecked, setPublicChecked] = useState(true);

  return (
    <Popover>
      <Popover.Content>
        <Row
          className="d-flex flex-row"
          style={{
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => setMixtapeChecked(!mixtapeChecked)}>
          <Col xs="2" className="mr-2">
            {mixtapeChecked && (
              <CheckIcon style={{ color: '#979696', fontSize: 20 }} />
            )}
          </Col>
          <Col>Mixtape Mode</Col>
        </Row>
        <Row
          className="d-flex flex-row"
          style={{ justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setPublicChecked(!publicChecked)}>
          <Col xs="2" className="mr-2">
            {publicChecked && (
              <CheckIcon style={{ color: '#979696', fontSize: 20 }} />
            )}
          </Col>
          <Col>Public</Col>
        </Row>
      </Popover.Content>
    </Popover>
  );
};

const PlaylistEditorBody = () => {
  const { currentEditPlaylist } = useContext(CurrentEditPlaylistContext);
  const [playlist, updatePlaylist] = useState(currentEditPlaylist.songs); // list of songIds
  const [listOfSongs, updateListOfSongs] = useState([]); // list of Song objects
  const [songResults, updateSongResults] = useState([]);
  const [playlistName, updatePlaylistName] = useState('');

  const handleSongDelete = async (updatedPlaylist) => {
    updatePlaylist(updatedPlaylist);
    try {
      await retrieveSongs(updatedPlaylist);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQueryAndReturn = (event) => {
    event.preventDefault();
    var enteredQuery = event.target.elements.query.value;
    if (enteredQuery !== '') {
      getSongResults(enteredQuery);
    }
  };

  const searchPopup = (
    <Popover>
      <Popover.Content className="mr-2">
        <div className="d-flex flex-row mb-3 align-items-center">
          <Form className="d-flex flex-row" onSubmit={updateQueryAndReturn}>
            <Form.Control
              type="text"
              name="query"
              placeholder="Song"
              size="sm"
              className="align-self-top"
            />
            <Button type="submit" variant="flat" style={{ color: '#979696' }}>
              Go
            </Button>
          </Form>
        </div>
        {songResults.map((s) => {
          return (
            <div
              key={s.id.videoId}
              className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div
                  id={s.id.videoId}
                  className="mb-3"
                  style={{ maxWidth: '3vw' }}>
                  <Image fluid src={s.snippet.thumbnails.medium.url} />
                </div>
                <div className="ml-2 align-self-top">
                  <p style={{ fontSize: 10 }}>
                    {s.snippet.title} <br />
                    by {s.snippet.channelTitle}
                  </p>
                </div>
              </div>
              <Button variant="flat" onClick={() => addSongToPlaylist(s)}>
                <AddIcon style={{ color: '#979696' }} />
              </Button>
            </div>
          );
        })}
      </Popover.Content>
    </Popover>
  );

  const addSongToPlaylist = async (song) => {
    try {
      const songRes = await Axios.post('/api/playlist/addSong', {
        playlistId: currentEditPlaylist.id,
        song,
      });
      const playlistCopy = playlist.slice(); // copy is made to push an element into it to update state
      playlistCopy.push(songRes.data);
      updatePlaylist(playlistCopy);
      await retrieveSongs(playlistCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const getSongResults = async (query) => {
    try {
      const songRes = await Axios.post('/api/youtube/songs', {
        query,
      });
      updateSongResults(songRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveSongs = async (songList) => {
    try {
      const songRes = await Axios.post('/api/song/getSongs', {
        songIds: songList,
      });
      updateListOfSongs(songRes.data);
      const playlistObject = await Axios.post('/api/playlist/getPlaylistById', {
        playlistId: currentEditPlaylist.id,
      });
      updatePlaylistName(playlistObject.data.playlistName);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    retrieveSongs(playlist);
  }, [playlist]);

  return (
    <Container fluid>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <Button variant="flat">
            <NavLink to="/playlists">
              <ArrowBackIosIcon
                className="align-self-center"
                style={{ color: '#979696' }}
              />
            </NavLink>
          </Button>

          <h2>Playlist Editor</h2>
        </div>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250 }}
          overlay={searchPopup}
          trigger="click"
          onToggle={() => updateSongResults([])}
          rootClose>
          <Button variant="flat">
            <SearchIcon
              className="align-self-center"
              style={{ color: '#979696' }}
            />
          </Button>
        </OverlayTrigger>
      </div>

      <div className="d-flex flex-row mt-3">
        <div className="d-flex flex-row flex-grow-1 ml-4">
          <h5 className="align-self-center">{playlistName}</h5>
          <Button variant="flat">
            <EditIcon className="ml-3" style={{ color: '#979696' }} />
          </Button>
        </div>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250 }}
          overlay={HelpTooltip}
          trigger="click"
          rootClose>
          <Button variant="flat">
            <HelpOutlineIcon style={{ color: '#979696' }} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom-end"
          delay={{ show: 250 }}
          overlay={SettingsPopup()}
          trigger="click"
          rootClose>
          <Button variant="flat">
            <SettingsIcon style={{ color: '#979696' }} />
          </Button>
        </OverlayTrigger>
      </div>

      {listOfSongs.map((s) => {
        return <PlaylistEditItem song={s} handleDelete={handleSongDelete} />;
      })}
    </Container>
  );
};

export default PlaylistEditorBody;
