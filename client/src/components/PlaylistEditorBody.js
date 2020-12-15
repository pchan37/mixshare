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
import SettingsIcon from '@material-ui/icons/Settings';

import { PlaylistEditItem } from './';
import { CurrentEditPlaylistContext, UserContext } from '../contexts';

const SettingsPopup = () => {
  const { currentEditPlaylist } = useContext(CurrentEditPlaylistContext);
  const [mixtapeChecked, setMixtapeChecked] = useState(
    currentEditPlaylist.mixtapeMode
  );

  const changeMixtapeMode = async () => {
    try {
      const updatedMode = await Axios.post('/api/playlist/changeMixtapeMode', {
        playlistId: currentEditPlaylist.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMixtapeClick = () => {
    setMixtapeChecked(!mixtapeChecked);
    changeMixtapeMode();
  };

  return (
    <Popover>
      <Popover.Content>
        <Row
          className="d-flex flex-row"
          style={{
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => handleMixtapeClick()}>
          <Col xs="2" className="mr-2">
            {mixtapeChecked && (
              <CheckIcon style={{ color: '#979696', fontSize: 20 }} />
            )}
          </Col>
          <Col className="text-light">Mixtape Mode</Col>
        </Row>
      </Popover.Content>
    </Popover>
  );
};

const PlaylistEditorBody = () => {
  const { currentUser } = useContext(UserContext);
  const { currentEditPlaylist } = useContext(CurrentEditPlaylistContext);
  const [playlist, updatePlaylist] = useState(currentEditPlaylist.songs); // list of songIds
  const [listOfSongs, updateListOfSongs] = useState([]); // list of Song objects
  const [songResults, updateSongResults] = useState([]);
  const [playlistName, updatePlaylistName] = useState('');
  const [friends, setFriends] = useState([]);

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
              className="align-self-top w-75"
            />
            <Button
              type="submit"
              variant="flat"
              className="w-25"
              style={{ color: '#979696' }}>
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
      const { data: songExists } = await Axios.post(
        '/api/playlist/checkForSong',
        {
          playlistId: currentEditPlaylist.id,
          song,
        }
      );
      if (songExists === false) {
        const songRes = await Axios.post('/api/playlist/addSong', {
          playlistId: currentEditPlaylist.id,
          song,
        });
        const playlistCopy = playlist.slice(); // copy is made to push an element into it to update state
        playlistCopy.push(songRes.data);
        updatePlaylist(playlistCopy);
        await retrieveSongs(playlistCopy);
      } else {
        console.error('This song already exists in your playlist!');
      }
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

  const getFriends = async () => {
    try {
      const friends = await Axios.post('api/user/friends', {
        username: currentUser.username,
      });
      setFriends(friends.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    retrieveSongs(playlist);
    getFriends();
  }, [playlist]);

  return (
    <Container fluid>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <NavLink className="align-self-center" to="/playlists">
            <ArrowBackIosIcon style={{ color: '#979696' }} />
          </NavLink>

          <h2 className="align-self-center m-0">Playlist Editor</h2>
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
        </div>

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
        return (
          <PlaylistEditItem
            friends={friends}
            song={s}
            handleDelete={handleSongDelete}
          />
        );
      })}
    </Container>
  );
};

export default PlaylistEditorBody;
