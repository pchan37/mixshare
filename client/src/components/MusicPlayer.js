import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Image } from 'react-bootstrap';
import YouTube from 'react-youtube';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { CurrentlyPlayingContext } from '../contexts';

import { PlaylistSongsPopup } from './';

const normalIconStyle = {
  color: '#979696',
  fontSize: 40,
  cursor: 'pointer',
};

const normalIconStyleActive = {
  color: '#6efae5',
  fontSize: 40,
  cursor: 'pointer',
};

const largeIconStyle = {
  ...normalIconStyle,
  fontSize: 60,
};

const FixedMusicPlayer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const MusicPlayer = ({ expandedState, height, setExpandedState, width }) => {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );
  const [player, setPlayer] = useState(null);

  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(currentlyPlaying.shuffle);
  const [repeat, setRepeat] = useState(currentlyPlaying.repeat);
  const [loop, setLoop] = useState(currentlyPlaying.opts.playerVars.loop);

  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [nextSong, setNextSong] = useState('');
  const [prevSong, setPrevSong] = useState('');

  // copy of state object maintained for ease of updating individual fields
  const playingContextCopy = { ...currentlyPlaying };

  const getPlaylist = async () => {
    const playlistItem = await Axios.post('/api/playlist/getPlaylistById', {
      playlistId: currentlyPlaying.playlist,
    });

    var playlistSongIds = [];

    if (playingContextCopy.shuffle) {
      playlistSongIds = [...currentlyPlaying.shuffledList];
      const shuffledSongsPlaylist = { ...playlistItem.data }
      shuffledSongsPlaylist.songs = playlistSongIds
      setPlaylist(shuffledSongsPlaylist);
    } else {
      playlistSongIds = playlistItem.data.songs;
      setPlaylist(playlistItem.data);
    }

    const playlistSongs = await Axios.post('/api/song/getSongs', {
      songIds: playlistSongIds,
    });
    setSongs(playlistSongs.data);

    setPrevAndNext(playlistSongIds);
  };

  const setPrevAndNext = (playlistSongIds) => {
    const index = playlistSongIds.indexOf(currentlyPlaying.song);

    if (playlistSongIds.length === 1) {
      if (repeat) {
        setNextSong(playlistSongIds[0]);
        setPrevSong(playlistSongIds[0]);
      }
    }
    if (index === 0) {
      setNextSong(playlistSongIds[index + 1]);
      if (repeat) {
        setPrevSong(playlistSongIds[playlistSongIds.length - 1]);
      }
    } else if (index === playlistSongIds.length - 1) {
      setPrevSong(playlistSongIds[index - 1]);
      if (repeat) {
        setNextSong(playlistSongIds[0]);
      }
    } else {
      setPrevSong(playlistSongIds[index - 1]);
      setNextSong(playlistSongIds[index + 1]);
    }
  }

  const getSongs = async (playlistSongIds) => {
    const playlistSongs = await Axios.post('/api/song/getSongs', {
      songIds: playlistSongIds,
    });
    setSongs(playlistSongs.data);
  }

  useEffect(() => {
    if (currentlyPlaying.song !== '') {
      setExpandedState(true);
    } else {
      setExpandedState(false);
    }
    if (currentlyPlaying.playlist.length === 36) {
      getPlaylist();
    }
  }, []);

  const FullscreenButton = (
    <FullscreenIcon
      onClick={() => {
        setExpandedState(!expandedState);
      }}
      style={normalIconStyle}
    />
  );

  const FullscreenExitButton = (
    <FullscreenExitIcon
      onClick={() => {
        playingContextCopy.song = '';
        setExpandedState(!expandedState);
        setCurrentlyPlaying(playingContextCopy);
      }}
      style={normalIconStyle}
    />
  );

  const NormalVideo = (
    <div className="h-100">
      <YouTube
        videoId={currentlyPlaying.song}
        id="player"
        opts={currentlyPlaying.opts}
        onReady={(e) => {
          setExpandedState(true);
          setPlayer(e.target);
          setPlaying(true);
        }}
        onStateChange={(e) => {
          if (e.data == YouTube.PlayerState.PLAYING) setPlaying(true);
          else if (e.data == YouTube.PlayerState.PAUSED) setPlaying(false);
        }}
        onEnd={() => {
          playingContextCopy.repeat = repeat;
          playingContextCopy.shuffle = shuffle;
          if (shuffle) {
            playingContextCopy.shuffledList = [...playlist.songs];
          }
          if (!loop) {
            // our playlist id length
            if (currentlyPlaying.playlist.length === 36) {
              playingContextCopy.song = nextSong;
            } else {
              playingContextCopy.song = '';
              playingContextCopy.opts.playerVars.loop = 0;
            }
          }
          setCurrentlyPlaying(playingContextCopy);
        }}
      />
    </div>
  );

  const ExpandedVideo = (
    <div
      style={{ height: '85vh' }}
      className="d-flex flex-grow align-items-center justify-content-center">
      <YouTube
        videoId={currentlyPlaying.song}
        id="player"
        opts={currentlyPlaying.opts}
        onReady={(e) => {
          setPlayer(e.target);
          setPlaying(true);
          setExpandedState(true);
        }}
        onStateChange={(e) => {
          if (e.data == YouTube.PlayerState.PLAYING) setPlaying(true);
          else if (e.data == YouTube.PlayerState.PAUSED) setPlaying(false);
        }}
        onEnd={() => {
          playingContextCopy.repeat = repeat;
          playingContextCopy.shuffle = shuffle;
          if (!loop) {
            // our playlist id length
            if (currentlyPlaying.playlist.length === 36) {
              playingContextCopy.song = nextSong;
            } else {
              playingContextCopy.song = '';
              playingContextCopy.opts.playerVars.loop = 0;
            }
          }
          setCurrentlyPlaying(playingContextCopy);
        }}
      />
    </div>
  );

  const PlayButton = (
    <PlayCircleOutlineOutlinedIcon
      style={largeIconStyle}
      onClick={() => {
        player.playVideo();
      }}
    />
  );

  const PauseButton = (
    <PauseCircleOutlineIcon
      style={largeIconStyle}
      onClick={() => {
        player.pauseVideo();
      }}
    />
  );

  const LoopButtonInactive = (
    <RepeatOneIcon
      style={normalIconStyle}
      onClick={() => {
        setLoop(1);
        playingContextCopy.opts.playerVars.loop = 1;
        playingContextCopy.opts.playerVars.playlist = currentlyPlaying.song;
      }}
    />
  );

  const LoopButtonActive = (
    <RepeatOneIcon
      style={normalIconStyleActive}
      onClick={() => {
        setLoop(0);
        playingContextCopy.opts.playerVars.loop = 0;
        playingContextCopy.opts.playerVars.playlist = '';
      }}
    />
  );

  const RepeatButtonInactive = (
    <RepeatIcon
      style={normalIconStyle}
      onClick={() => {
        if (currentlyPlaying.playlist !== '') {
          setRepeat(!repeat);
          const songsCopy = [...playlist.songs];
          if (prevSong === '') {
            setPrevSong(songsCopy[songsCopy.length - 1]);
          }
          if (nextSong === '') {
            setNextSong(songsCopy[0]);
          }
        }
      }}
    />
  );

  const RepeatButtonActive = (
    <RepeatIcon
      style={normalIconStyleActive}
      onClick={() => {
        setRepeat(!repeat);
      }}
    />
  );

  const ShuffleButtonInactive = (
    <ShuffleIcon
      style={normalIconStyle}
      onClick={() => {
        if (currentlyPlaying.playlist !== '' && !playlist.mixtapeMode) {
          setShuffle(true);
          playingContextCopy.shuffle = true;
          const shuffledSongs = [...playlist.songs];
          for (let i = shuffledSongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = shuffledSongs[i];
            shuffledSongs[i] = shuffledSongs[j];
            shuffledSongs[j] = temp;
          }
          const currSongIndex = shuffledSongs.indexOf(currentlyPlaying.song);
          [shuffledSongs[0], shuffledSongs[currSongIndex]] = [shuffledSongs[currSongIndex], shuffledSongs[0]];

          setPlaylist((prevState) => ({ ...prevState, songs: shuffledSongs }));
          getSongs(shuffledSongs);
          setPrevAndNext(shuffledSongs);
        }
      }}
    />
  );

  const ShuffleButtonActive = (
    <ShuffleIcon
      style={normalIconStyleActive}
      onClick={() => {
        setShuffle(false);
        playingContextCopy.shuffle = false;
        console.log("shuffle", shuffle);
        getPlaylist();
      }}
    />
  );

  return (
    <>
      {expandedState && ExpandedVideo}
      <FixedMusicPlayer height={height} width={width}>
        <div className="d-flex align-items-center h-100">
          <div className="d-flex align-items-center w-100" style={{ height }}>
            <div
              className="d-flex justify-content-center"
              style={{ gap: '2rem', flex: '5' }}>
              <SkipPreviousIcon
                style={largeIconStyle}
                onClick={() => {
                  playingContextCopy.repeat = repeat;
                  playingContextCopy.shuffle = shuffle;
                  if (shuffle) playingContextCopy.shuffledList = [...playlist.songs];
                  playingContextCopy.song = prevSong;
                  setCurrentlyPlaying(playingContextCopy);
                }}
              />
              {playing ? PauseButton : PlayButton}
              <SkipNextIcon
                style={largeIconStyle}
                onClick={() => {
                  playingContextCopy.repeat = repeat;
                  playingContextCopy.shuffle = shuffle;
                  if (shuffle) playingContextCopy.shuffledList = [...playlist.songs];
                  playingContextCopy.song = nextSong;
                  setCurrentlyPlaying(playingContextCopy);
                }}
              />
            </div>
            <div
              className="d-flex justify-content-center flex-grow-1 flex-shrink-1"
              style={{ gap: '1rem' }}>
              {shuffle ? ShuffleButtonActive : ShuffleButtonInactive}
              {repeat ? RepeatButtonActive : RepeatButtonInactive}
              {loop === 1 ? LoopButtonActive : LoopButtonInactive}
            </div>
            <div
              className="d-flex justify-content-center flex-grow-1 flex-shrink-1"
              style={{ gap: '1rem' }}>
              <PlaylistSongsPopup songs={songs} style={normalIconStyle} />
              {expandedState && FullscreenExitButton}
            </div>
          </div>
        </div>
      </FixedMusicPlayer>
    </>
  );
};

MusicPlayer.propTypes = {
  expandedState: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
  setExpandedState: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

export default MusicPlayer;
