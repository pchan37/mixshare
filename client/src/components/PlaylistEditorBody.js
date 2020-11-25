import React, { useState, useRef, useEffect } from 'react';
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
import {
  Add,
  ArrowBackIos,
  Check,
  Search,
  Edit,
  HelpOutline,
  Settings,
} from '@material-ui/icons';
import { PlaylistEditItem } from './';

import data from '../placeholders/data';

const HelpButton = (
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
              <Check style={{ color: '#979696', fontSize: 20 }} />
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
              <Check style={{ color: '#979696', fontSize: 20 }} />
            )}
          </Col>
          <Col>Public</Col>
        </Row>
      </Popover.Content>
    </Popover>
  );
};

const PlaylistEditorBody = (props) => {
  const [playlist, updatePlaylist] = useState([]);
  const [listOfSongs, updateListOfSongs] = useState([]);
  const [query, updateQuery] = useState('');
  const [songResults, updateSongResults] = useState([]);

  const updateQueryAndReturn = (event) => {
    event.preventDefault();
    var enteredQuery = event.target.elements.query.value;
    if (!(enteredQuery === '')) {
      getSongResults(enteredQuery);
    }
    updateQuery(enteredQuery);
  };

  const SearchPopup = (
    <Popover>
      <Popover.Content className="mr-2">
        <div className="d-flex flex-row mb-3" style={{ alignItems: 'center' }}>
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
              className="d-flex flex-row"
              style={{ justifyContent: 'space-between' }}>
              <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
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
                <Add style={{ color: '#979696' }} />
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
        playlistId: props.id.id,
        song: song,
      });
      console.log(songRes);
      console.log(listOfSongs);
      updateListOfSongs(listOfSongs.concat(songRes.data));
      console.log(listOfSongs);
    } catch (err) {
      console.error(err);
    }
  };

  const getSongResults = async (query) => {
    try {
      const songRes = await Axios.post('/api/youtube/songs', {
        query: query,
      });
      updateSongResults(songRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveSongs = async () => {
    try {
      const playlistRes = await Axios.post('/api/playlist/getPlaylistById', {
        playlistId: props.id.id,
      });
      console.log(playlistRes.data);
      updatePlaylist(playlistRes.data);
      console.log(playlistRes.data);
      const songRes = await Axios.post('/api/song/getSongs', {
        songIds: playlistRes.data.songs,
      });
      console.log(listOfSongs);
      updateListOfSongs(songRes.data);
      console.log(listOfSongs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    retrieveSongs();
  }, []);

  return (
    <Container fluid>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <Button variant="flat">
            <NavLink to="/playlists">
              <ArrowBackIos
                className="align-self-center"
                style={{ color: '#979696' }}
              />
            </NavLink>
          </Button>

          <h2>Playlist Editor</h2>
        </div>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={SearchPopup}
          trigger="click">
          <Button variant="flat">
            <Search
              className="align-self-center"
              style={{ color: '#979696' }}
            />
          </Button>
        </OverlayTrigger>
      </div>

      <div className="d-flex flex-row mt-3">
        <div className="d-flex flex-row flex-grow-1 ml-4">
          <h5 className="align-self-center">{playlist.playlistName}</h5>
          <Button variant="flat">
            <Edit className="ml-3" style={{ color: '#979696' }} />
          </Button>
        </div>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={HelpButton}
          trigger="click">
          <Button variant="flat">
            <HelpOutline style={{ color: '#979696' }} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom-end"
          delay={{ show: 250, hide: 400 }}
          overlay={SettingsPopup()}
          trigger="click">
          <Button variant="flat">
            <Settings style={{ color: '#979696' }} />
          </Button>
        </OverlayTrigger>
      </div>

      {listOfSongs.map((s) => {
        return (
          <PlaylistEditItem
            name={s.title}
            artist={s.artist}
            thumbnail={s.thumbnail}
          />
        );
      })}
    </Container>
  );
};

export default PlaylistEditorBody;
