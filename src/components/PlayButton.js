import React, { useState } from "react";
import { Icon } from "@iconify/react";

const PlayButton = ({ trackId }) => {
  const [idList, setIdList] = useState(() => {
    const savedIdList = localStorage.getItem("idList");
    return savedIdList ? JSON.parse(savedIdList) : [];
  });

  // Function to handle adding trackId to the playlist
  const handleAddToPlaylist = () => {
    const updatedIdList = [...idList, trackId];
    setIdList(updatedIdList);
    localStorage.setItem("idList", JSON.stringify(updatedIdList)); // Save updated list to localStorage
    console.log(`Added track ${trackId} to playlist`);
  };

  return (
    <button className="btn btn-primary" onClick={handleAddToPlaylist}>
      <Icon icon="ph-play-fill" />
    </button>
  );
};

export default PlayButton;
