import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Button, Image, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Add, DeleteOutline, Edit } from '@material-ui/icons';

import FriendListPopup from './FriendListPopup';
import {
  CurrentEditPlaylistContext,
  CurrentlyPlayingContext,
  UserContext,
} from '../contexts';

const MyPlaylistsBody = () => {
  const { currentUser } = useContext(UserContext);
  const { setCurrentEditPlaylist } = useContext(CurrentEditPlaylistContext);
  const [listOfPlaylists, updateListOfPlaylists] = useState([]);
  const [friends, setFriends] = useState([]);

  const getPlaylist = async () => {
    try {
      const playlistRes = await Axios.post('/api/playlist/getPlaylist', {
        username: currentUser.username,
      });
      updateListOfPlaylists(playlistRes.data);
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
    getPlaylist();
    setCurrentEditPlaylist(null);
    getFriends();
  }, []);

  const NewPlaylistPopup = (props) => {
    const createPlaylist = async (event) => {
      event.preventDefault();
      const form = event.target;

      const playlistName = form.elements.name.value;

      if (playlistName !== '') {
        try {
          const newPlaylistRes = await Axios.post('/api/playlist/newPlaylist', {
            playlistName: form.elements.name.value,
            username: currentUser.username,
          });
          updateListOfPlaylists(listOfPlaylists.concat(newPlaylistRes.data));
          document.body.click(); // TODO: refactor this in the future
        } catch (err) {
          console.log(err.response);
        }
      } else {
        console.log('Playlist name cannot be empty');
      }
    };

    return (
      <Popover id="popover-basic" {...props}>
        <Popover.Content style={{ textAlign: 'center' }}>
          <Form onSubmit={createPlaylist}>
            <Form.Group>
              <Form.Control name="name" placeholder="Name of Playlist" />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Popover.Content>
      </Popover>
    );
  };

  const deletePlaylist = async (props) => {
    try {
      const playlistRes = await Axios.post('/api/playlist/deletePlaylist', {
        playlistId: props.id,
        username: props.owner,
      });
      updateListOfPlaylists(playlistRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const PlaylistItem = (props) => {
    const { currentlyPlaying, setCurrentlyPlaying } = useContext(
      CurrentlyPlayingContext
    );
    const [listOfSongs, updateListOfSongs] = useState([]);
    const DEFAULT_THUMBNAIL =
      'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';
    const [thumbnail, updateThumbnail] = useState('');

    const getSongs = async () => {
      try {
        const songRes = await Axios.post('/api/song/getSongs', {
          songIds: props.songs.slice(0, 4),
        });
        updateListOfSongs(songRes.data);
        if (songRes.data.length !== 0)
          updateThumbnail(songRes.data[0].thumbnail);
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      getSongs();
    }, []);

    return (
      <div className="d-flex flex-column border-bottom pb-2 mb-2">
        <div className="d-flex flex-row">
          <h4>{props.name}</h4>
        </div>
        <div className="d-flex flex-row">
          <div className="d-flex flex-row flex-grow-1">
            <Image
              fluid
              style={{ maxWidth: '20vw', cursor: 'pointer' }}
              src={thumbnail !== '' ? thumbnail : DEFAULT_THUMBNAIL}
              onClick={() => {
                setCurrentlyPlaying((prevState) => ({
                  ...prevState,
                  song: props.songs[0],
                  playlist: props.id,
                  shuffle: false,
                  shuffledList: [],
                  opts: {
                    ...prevState.opts,
                    playerVars: {
                      ...prevState.opts.playerVars,
                      loop: 0,
                      playlist: ''
                    }
                  }
                }));
                console.log(props.id);
                console.log(currentlyPlaying);
              }}
            />
            <div className="ml-4">
              {listOfSongs.map((s) => {
                return <p>{s.title}</p>;
              })}
              {props.songs.length > 4 && <p>And More...</p>}
            </div>
          </div>
          <div className="d-flex flex-row">
            <Button
              variant="flat"
              onClick={() => setCurrentEditPlaylist(props)}>
              <NavLink
                to={{
                  pathname: '/edit',
                }}>
                <Edit style={{ color: '#979696' }} />
              </NavLink>
            </Button>
            <FriendListPopup friends={props.friends} itemId={props.id} />
            <Button variant="flat" onClick={() => deletePlaylist(props)}>
              <DeleteOutline style={{ color: '#979696' }} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const PlaylistItemList = () => {
    return (
      <>
        {listOfPlaylists.map((p) => {
          return (
            <PlaylistItem
              key={p.playlistId}
              id={p.playlistId}
              name={p.playlistName}
              owner={p.ownerUsername}
              songs={p.songs}
              friends={friends}
              mixtapeMode={p.mixtapeMode}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <div
        className="d-flex flex-row mb-2"
        style={{ justifyContent: 'space-between' }}>
        <h2 className="col-lg-auto" href="/edit">
          My Playlists
        </h2>
        <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250 }}
            overlay={NewPlaylistPopup}
            trigger="click"
            rootClose>
            <Button variant="flat">
              <Add style={{ color: '#979696', fontSize: 20 }} />
              new playlist
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <PlaylistItemList />
    </>
  );
};

export default MyPlaylistsBody;
