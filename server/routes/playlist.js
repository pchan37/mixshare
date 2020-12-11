const express = require('express');
const router = express.Router();

const { v4: uuid } = require('uuid');

const { Playlist, Song } = require('../database/models');
const response = require('../lib').Response;

// POST /newPlaylist: Create a new playlist
router.post('/newPlaylist', async (req, res) => {
  const playlistId = uuid();
  try {
    const newPlaylist = await Playlist.create({
      playlistId,
      ownerUsername: req.body.username,
      playlistName: req.body.playlistName,
      mixtapeMode: false,
      private: false,
      views: 0,
      songs: [],
    });
    res.send(newPlaylist);
  } catch (err) {
    console.error(err);
  }
});

// POST /getPlaylist: retrieve list of playlists
router.post('/getPlaylist', async (req, res) => {
  const username = req.body.username;
  try {
    const playlists = await Playlist.find({ ownerUsername: username });
    res.send(playlists);
  } catch (err) {
    console.error(err);
  }
});

// POST /getPlaylistById: retrieve a playlist with playlistId
router.post('/getPlaylistById', async (req, res) => {
  const playlistId = req.body.playlistId;
  try {
    const playlist = await Playlist.findOne({ playlistId });
    res.send(playlist);
  } catch (err) {
    console.error(err);
  }
});

// POST /forkPlaylist: create a copy of a playlist
router.post('/forkPlaylist', async (req, res) => {
  const username = req.body.username;
  const playlist = req.body.playlist;
  const playlistId = uuid();
  try {
    const newPlaylist = await Playlist.create({
      playlistId,
      ownerUsername: username,
      playlistName: playlist.playlistName,
      mixtapeMode: playlist.mixtapeMode,
      views: 0,
      songs: playlist.songs,
    });
    res.send(newPlaylist);
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /changeMixtapeMode: change Mixtape Mode field
router.post('/changeMixtapeMode', async (req, res) => {
  const playlistId = req.body.playlistId;
  try {
    const playlist = await Playlist.findOne({ playlistId });
    const updatedMode = await Playlist.findOneAndUpdate(
      { playlistId },
      { mixtapeMode: !playlist.mixtapeMode },
      { new: true } // setting new:true returns document after update so you can check if update changed
    );
    res.send(updatedMode);
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /deletePlaylist: delete a playlist
router.post('/deletePlaylist', async (req, res) => {
  const playlistId = req.body.playlistId;
  const username = req.body.username;
  try {
    await Playlist.findOneAndDelete({ playlistId });
    const updatedPlaylist = await Playlist.find({ ownerUsername: username });
    res.send(updatedPlaylist);
  } catch (err) {
    console.error(err);
  }
});

// POST /checkForSong: check if a song already exists in a playlist
router.post('/checkForSong', async (req, res) => {
  const playlistId = req.body.playlistId;
  const songId = req.body.song.id.videoId;
  try {
    const playlist = await Playlist.findOne({ playlistId });
    const songExists = playlist.songs.includes(songId);
    res.send(songExists);
  } catch (err) {
    console.error(err);
    return response.UserError(
      res,
      400,
      'This song already exists in your playlist.'
    );
  }
});

// POST /addSong: add a song to playlist
router.post('/addSong', async (req, res) => {
  const playlistId = req.body.playlistId;
  const songId = req.body.song.id.videoId;
  try {
    await Playlist.findOneAndUpdate(
      { playlistId },
      { $addToSet: { songs: songId } }
    );

    const findSong = await Song.findOne({ songId });
    if (findSong === null) {
      await Song.create({
        songId,
        title: req.body.song.snippet.title,
        artist: req.body.song.snippet.channelTitle,
        thumbnail: req.body.song.snippet.thumbnails.medium.url,
      });
    }
    console.log(songId);
    res.send(songId);
  } catch (err) {
    console.error(err);
  }
});

// POST /deleteSong: delete a song from playlist
router.post('/deleteSong', async (req, res) => {
  const playlistId = req.body.playlistId;
  const songId = req.body.songId;
  try {
    await Playlist.findOneAndUpdate(
      { playlistId: playlistId },
      { $pull: { songs: songId } }
    );
    const updatedPlaylist = await Playlist.findOne({ playlistId });
    res.send(updatedPlaylist.songs);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
