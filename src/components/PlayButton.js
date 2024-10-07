import React, { useContext } from "react";
import { MusicContext } from '../context/MusicContext';
import { Icon } from "@iconify/react";

const PlayButton = ({ trackId }) => {
  const { addToMusicList } = useContext(MusicContext);

  // Function to handle adding trackId to the playlist
  const handleAddToPlaylist = () => {
    addToMusicList(trackId);
  };

  return (
    <button className="btn btn-primary" onClick={handleAddToPlaylist}>
      <Icon icon="ph-play-fill" />
    </button>
  );
};

export default PlayButton;
