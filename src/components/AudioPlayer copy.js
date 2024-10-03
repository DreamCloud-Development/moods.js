import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackToPlaylist, setPlaylistIndex, getPlaylist } from '../stores/playlist';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { playlist, playlistIndex } = useSelector((state) => state.playlist);

  const [trackData, setTrackData] = useState('');
  const [mediaData, setMediaData] = useState(null);
  const [bulkTrackData, setBulkTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [musicBarWidth, setMusicBarWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(1);

  const audioPlayer = useRef(null);

  const playPauseButton = () => {
    if (audioPlayer.current.paused) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((prevState) => !prevState);
  };

  const shuffleButton = () => {
    setIsShuffled((prevState) => !prevState);
  };

  const loopButton = () => {
    setIsLooped((prevState) => !prevState);
  };

  const skipTrack = () => {
    if (playlistIndex + 1 < playlist.length) {
      audioPlayer.current.pause();
      dispatch(setPlaylistIndex(playlistIndex + 1));
    }
  };

  const redoTrack = () => {
    if (playlistIndex > 0) {
      audioPlayer.current.pause();
      dispatch(setPlaylistIndex(playlistIndex - 1));
    }
  };

  const updateCurrentVolume = () => {
    audioPlayer.current.volume = currentVolume;
  };

  const setupMediaSession = (superTrackData) => {
    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: superTrackData.title,
        artist: `${superTrackData.user.name} on MOOD™`,
        artwork: [
          { src: superTrackData.artwork['480x480'], sizes: '96x96', type: 'image/png' },
          { src: superTrackData.artwork['480x480'], sizes: '256x256', type: 'image/png' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioPlayer.current.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        audioPlayer.current.pause();
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        redoTrack();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        skipTrack();
      });
    }
  };

  const currentTrackData = useMemo(() => trackData, [trackData]);

  return (
    <div>
      {playlistIndex !== -1 && (
        <div className="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-4 bg-base-300 border-t-2 border-primary-content md:grid-cols-3">
          <div className="items-center justify-center hidden me-auto md:flex">
            <img className="h-12 me-3 rounded" src={currentTrackData.artwork['480x480']} alt="Song's Artwork" />
            <div className="inline-block leading-none">
              <span className="text-sm">
                <a href={`/track/${currentTrackData.id}`}>
                  <i className="ph:music-note-fill"></i> {currentTrackData.title}
                </a>
              </span>
              <br />
              <span className="text-sm">
                <a href={`/user/${currentTrackData.user.handle}`}>
                  <i className="ph:person-fill"></i> {currentTrackData.user.name}
                </a>
              </span>
            </div>
          </div>
          <div className="flex items-center w-full">
            {/* Playback controls and volume slider */}
          </div>
          <div className="items-center justify-center hidden ms-auto md:flex">
            {/* Additional controls */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;