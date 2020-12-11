import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { Button, Form, Tabs, Tab } from 'react-bootstrap';

import { GiftItem } from './';

import AddIcon from '@material-ui/icons/Add';
import CallSplitIcon from '@material-ui/icons/CallSplit';

import { UserContext } from '../contexts';

const GiftBody = () => {
  const { currentUser } = useContext(UserContext);
  const [playlistsGifts, setPlaylistGifts] = useState([]);
  const [songRecs, setSongRecs] = useState([]);

  const getPlaylistGifts = async () => {
    try {
      const playlists = await Axios.get('/api/gifts/playlistGifts', {
        params: {
          username: currentUser.username,
        },
      });
      setPlaylistGifts(playlists.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSongRecs = async () => {
    try {
      const songs = await Axios.get('/api/gifts/songRecommendations', {
        params: { username: currentUser.username },
      });
      setSongRecs(songs.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeGiftItem = async (giftId) => {
    console.log(`removing gift Item ${giftId}`);
    try {
      await Axios.post('/api/gifts/removeGift', {
        username: currentUser.username,
        giftId,
      });
      getPlaylistGifts();
      getSongRecs();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlaylistGifts();
    getSongRecs();
  }, []);

  return (
    <div>
      <div
        className="d-flex flex-row mb-3"
        style={{ justifyContent: 'space-between' }}>
        <h2>Gifts</h2>
        <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
          <span className="align-self-top mr-3 col-lg-auto">Sort by:</span>
          <Form.Control as="select">
            <option>From Friends</option>
            <option>From Anyone</option>
          </Form.Control>
        </div>
      </div>

      <Tabs className="mb-3">
        <Tab eventKey="gifts" title="Playlists" className="p-2">
          {playlistsGifts.map((p) => {
            return (
              <GiftItem
                key={p.id}
                removeGift={() => removeGiftItem(p.giftId)}
                playlistId={p.playlistItem.playlistId}
                songId={p.playlistItem.songs[0]}
                name={p.playlistItem.playlistName}
                artist={p.playlistItem.ownerUsername}
                gifter={p.gifterUsername}
                message={p.message}
                thumbnail={p.thumbnail}>
                <Button variant="flat">
                  <CallSplitIcon style={{ color: '#979696' }} />
                </Button>
              </GiftItem>
            );
          })}
        </Tab>
        <Tab eventKey="songRecs" title="Song Recommendations" className="p-2">
          {songRecs.map((s) => {
            return (
              <GiftItem
                key={s.id}
                removeGift={() => removeGiftItem(s.giftId)}
                songId={s.songItem.songId}
                name={s.songItem.title}
                artist={s.songItem.artist}
                gifter={s.gifterUsername}
                message={s.message}
                thumbnail={s.songItem.thumbnail}>
                <Button variant="flat">
                  <AddIcon style={{ color: '#979696' }} />
                </Button>
              </GiftItem>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default GiftBody;
