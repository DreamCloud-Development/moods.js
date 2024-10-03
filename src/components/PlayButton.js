//import { useEffect } from 'react';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTrackToPlaylist } from '../stores/playlist';
import { Icon } from '@iconify/react';

const PlayButton = ({ trackId }) => {
  const dispatch = useDispatch();
  const { playlist, playlistIndex } = useSelector((state) => state.playlist);

  const handleAddToPlaylist = () => {
    dispatch(addTrackToPlaylist(trackId));
    console.log(playlist, playlistIndex);
  };

  return (
    <button className="btn btn-primary" onClick={handleAddToPlaylist}>
      <Icon icon="ph-play-fill" />
    </button>
  );
};

export default PlayButton;