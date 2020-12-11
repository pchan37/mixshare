const express = require('express');
const router = express.Router();

const { v4: uuid } = require('uuid');

const { Account, Playlist, Song, User } = require('../database/models');
const response = require('../lib').Response;

// POST /createSong: creates a song document if one does not already exist
router.post('/createSong', async (req, res) => {
  try {
    const songId = req.body.videoId;
    const songItem = req.body.songItem;

    const song = await Song.findOne({ songId });
    if (song === null || song === undefined) {
      await Song.create({
        songId,
        title: songItem.snippet.title,
        artist: songItem.snippet.channelTitle,
        thumbnail: songItem.snippet.thumbnails.medium.url,
      });
    }
    return response.OK(res, 200, 'ready to gift song');
  } catch (err) {
    return response.ServerError(res);
  }
});

// POST /sendGift: handles sending of both songs and playlists
router.post('/sendGift', async (req, res) => {
  try {
    const selfUsername = req.body.username;
    const targetId = req.body.targetId;
    const giftItemId = req.body.giftItemId;
    const message = req.body.message;

    // get selfId
    const selfAccount = await Account.findOne({ username: selfUsername });
    const selfId = selfAccount.userId;

    if (giftItemId.length !== 11) {
      const playlistItem = await Playlist.findOne({ playlistId: giftItemId });
      if (playlistItem.songs.length !== 0) {
        // add gift to receipient gifted playlists
        await User.findOneAndUpdate(
          { userId: targetId },
          {
            $push: {
              receivedGiftPlaylists: {
                giftId: `G-${uuid()}`,
                gifterUserId: selfId,
                message,
                playlistId: giftItemId,
              },
            },
          }
        );
        return response.OK(res, 200, 'Gift sent successfully');
      } else {
        return response.UserError(res, 400, 'Cannot gift an empty playlist');
      }
    } else {
      // assume songItem exists in database
      // case where song is not in database is handled in /createSong
      await User.findOneAndUpdate(
        { userId: targetId },
        {
          $push: {
            receivedSongRecommendations: {
              giftId: `G-${uuid()}`,
              gifterUserId: selfId,
              message,
              songId: giftItemId,
            },
          },
        }
      );
      return response.OK(res, 200, 'Song sent successfully');
    }
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// GET /playlistGifts: gets received playlistGifts
router.get('/playlistGifts', async (req, res) => {
  try {
    const selfUsername = req.query.username;

    // get selfId
    const selfAccount = await Account.findOne({ username: selfUsername });
    const selfId = selfAccount.userId;

    const selfUser = await User.findOne({ userId: selfId }).lean();
    const receivedPlaylists = selfUser.receivedGiftPlaylists;
    for await (const gift of receivedPlaylists) {
      // get gifter username
      const gifterUser = await Account.findOne({ userId: gift.gifterUserId });

      if (gifterUser !== null && gifterUser !== undefined)
        gift['gifterUsername'] = gifterUser.username;
      else gift['gifterUsername'] = '[Deleted User]';

      // get playlist item
      const playlistItem = await Playlist.findOne({
        playlistId: gift.playlistId,
      });

      if (playlistItem !== null && playlistItem !== undefined) {
        gift['playlistItem'] = playlistItem;

        // get thumbnail
        const firstSong = await Song.findOne({
          songId: playlistItem.songs[0],
        });
        gift['thumbnail'] = firstSong.thumbnail;
      } else {
        gift['playlistItem'] = {
          playlistName: '[Deleted Playlist]',
          ownerUsername: '[unknown]',
        };
      }
    }
    res.send(receivedPlaylists);
  } catch (err) {
    return response.ServerError(res);
  }
});

// GET /songRecommendations: gets received song recommendations
router.get('/songRecommendations', async (req, res) => {
  try {
    const selfUsername = req.query.username;

    // get selfId
    const selfAccount = await Account.findOne({ username: selfUsername });
    const selfId = selfAccount.userId;

    const selfUser = await User.findOne({ userId: selfId }).lean();
    const songRecs = selfUser.receivedSongRecommendations;

    for await (const song of songRecs) {
      const gifterAccount = await Account.findOne({
        userId: song.gifterUserId,
      });
      if (gifterAccount !== null && gifterAccount !== undefined)
        song['gifterUsername'] = gifterAccount.username;
      else song['gifterUsername'] = '[Deleted User]';

      const songItem = await Song.findOne({ songId: song.songId });
      song['songItem'] = songItem;
    }

    res.send(songRecs);
  } catch (err) {
    return response.ServerError(res);
  }
});

router.post('/removeGift', async (req, res) => {
  console.log('removing gift');
  try {
    const selfUsername = req.body.username;
    const giftId = req.body.giftId;

    const selfAccount = await Account.findOne({ username: selfUsername });
    const selfId = selfAccount.userId;

    await User.findOneAndUpdate(
      { userId: selfId },
      { $pull: { receivedGiftPlaylists: { giftId } } }
    );

    await User.findOneAndUpdate(
      { userId: selfId },
      { $pull: { receivedSongRecommendations: { giftId } } }
    );

    return response.OK(res, 200, 'Gift successfully removed');
  } catch (err) {
    return response.ServerError(res);
  }
});

module.exports = router;
