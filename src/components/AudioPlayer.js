import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Icon } from "@iconify/react";
import Context from '../Context';

const AudioPlayer = () => {
  const { playlist, playlistIndex, setPlaylistIndex } = useState("");

  const [trackData, setTrackData] = useState("");
  const [streamData, setMediaData] = useState(null);
  const [listData, setBulkTrackData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [musicBarWidth, setMusicBarWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(1);

  const audioPlayer = useRef(null);

  const [idList, setIdList] = useState(() => {
    const savedIdList = localStorage.getItem("idList");
    return savedIdList ? JSON.parse(savedIdList) : [];
  });

  const handleStorageChange = (event) => {
    console.log("Detected localStorage change:", event);
    if (event.key === "idList") {
      const updatedIdList = JSON.parse(event.newValue);
      setIdList(updatedIdList); // Update state based on localStorage change
      console.log(
        "Detected localStorage change, updated ID list:",
        updatedIdList
      );
    }
  };

  window.addEventListener("storage", handleStorageChange);

  const playPauseButton = () => {
    if (true === false) {
      if (audioPlayer.current.paused) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
      setIsPlaying((prevState) => !prevState);
    }
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
    }
  };

  const redoTrack = () => {
    if (playlistIndex > 0) {
      audioPlayer.current.pause();
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
          {
            src: superTrackData.artwork["480x480"],
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: superTrackData.artwork["480x480"],
            sizes: "256x256",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioPlayer.current.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioPlayer.current.pause();
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        redoTrack();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        skipTrack();
      });
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-4 bg-base-300 border-t-2 border-primary-content md:grid-cols-3">
        <div className="items-center justify-center hidden me-auto md:flex">
          <img
            className="h-12 me-3 rounded"
            src="{currentTrackData.artwork['480x480']}"
            alt="Song's Artwork"
          />
          <div className="inline-block leading-none">
            <span className="text-sm">
              <a href="/track/currentTrackData.id">
                <i className="ph:music-note-fill"></i> currentTrackData.title
              </a>
            </span>
            <br />
            <span className="text-sm">
              <a href="currentTrackData.user.handle">
                <i className="ph:person-fill"></i> currentTrackData.user.name
              </a>
            </span>
          </div>
        </div>
        <div className="flex items-center w-full">
          <div>
            <div className="flex items-center justify-center mx-auto mb-1 self-end">
              <button
                data-tooltip-target="tooltip-expand"
                type="button"
                onClick={() =>
                  document.getElementById("sound_modal_3").showModal()
                }
                className="p-2.5 mr-8 md:hidden group rounded-full hover:bg-gray-100 me-1 dark:hover:bg-gray-600"
              >
                <Icon
                  icon="streamline:volume-level-high-solid"
                  className="text-primary"
                />
                <span className="sr-only">Adjust Volume</span>
              </button>
              <dialog id="sound_modal_1" className="modal">
                <div
                  className="absolute modal-box w-5 left-4 bottom-8 p-0 m-0 rounded-sm"
                  style={{ height: "136px-lr" }}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    orient="vertical"
                    className="translate-y-1"
                    style={{ writingMode: "vertical-lr", direction: "rtl" }}
                  />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <dialog id="sound_modal_3" className="modal">
                <div className="absolute bottom-28 modal-box flex items-center gap-2 p-2 rounded-lg w-10/12">
                  <Icon icon="streamline:volume-mute-solid" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    className="range"
                  />
                  <Icon icon="streamline:volume-level-high-solid" />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <div className="tooltip" data-tip="Not Implemented">
                <button
                  data-tooltip-target="tooltip-shuffle"
                  type="button"
                  className="p-2.5 group rounded-full me-1"
                >
                  <Icon
                    icon="streamline:play-list-folder-solid"
                    className="text-error"
                  />
                  <span className="sr-only">Add to Playlist</span>
                </button>
              </div>

              <button
                data-tooltip-target="tooltip-previous"
                type="button"
                className="p-2.5 group rounded-full"
              >
                <Icon
                  icon="streamline:button-previous-solid"
                  className="text-primary"
                />
                <span className="sr-only">Previous Song</span>
              </button>

              <button
                data-tooltip-target="tooltip-pause"
                type="button"
                className="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-primary rounded-lg"
                onClick={playPauseButton()}
              >
                <Icon
                  icon="streamline:button-play-solid"
                  prout="streamline:button-pause-2-solid"
                  className="text-primary-content"
                />
                <span className="sr-only">Pause Song</span>
              </button>

              <button
                data-tooltip-target="tooltip-next"
                type="button"
                className="p-2.5 group rounded-full"
              >
                <Icon
                  icon="streamline:button-next-solid"
                  className="text-primary"
                />
                <span className="sr-only">Next Song</span>
              </button>

              <div className="tooltip" data-tip="Not Implemented">
                <button
                  data-tooltip-target="tooltip-restart"
                  type="button"
                  className="p-2.5 group rounded-full "
                >
                  <Icon
                    icon="streamline:hearts-symbol-solid"
                    className="text-error"
                  />
                  <span className="sr-only">Add to Favorites</span>
                </button>
              </div>

              <button
                data-tooltip-target="tooltip-volume"
                type="button"
                onClick={() =>
                  document.getElementById("queue_modal").showModal()
                }
                className="p-2.5 ml-8 md:hidden group rounded-lg bg-base-100 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Icon icon="ph:playlist-bold" className="text-primary" />
                playlist.length
                <span className="sr-only">Open Queue</span>
              </button>
              <dialog id="queue_modal" className="modal">
                <div className="modal-box h-96 w-96 relative overflow-y-auto">
                  <h3 className="font-bold text-lg">My Queue</h3>
                  <div>
                    <div></div>
                  </div>
                  <div className="flex justify-center gap-2 z-10 sticky bottom-0">
                    <button
                      data-tooltip-target="tooltip-captions"
                      type="button"
                      className="btn w-1/2 inline-block p-0 rounded-lg text-error z-20"
                    >
                      <Icon
                        icon="streamline:shuffle-solid"
                        className="text-error"
                      />
                      Shuffle Tracks
                    </button>
                    <button
                      data-tooltip-target="tooltip-captions"
                      type="button"
                      className="btn btn-success w-1/2 inline-block p-0 rounded-lg z-20"
                    >
                      <Icon
                        icon="streamline:arrow-infinite-loop-solid"
                        className="text-primary"
                      />
                      Loop Tracks
                    </button>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>

            <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex">
                new Date(currentTime * 1000).toISOString().substring(14, 19)
              </span>
              <div className="w-full bg-base-100 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full"></div>

                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex">
                  new Date(trackData.duration *
                  1000).toISOString().substring(14, 19)
                </span>
              </div>
            </div>
          </div>
          <div className="items-center justify-center hidden ms-auto md:flex">
            <div className="tooltip" data-tip="Not Implemented">
              <button
                data-tooltip-target="tooltip-playlist"
                type="button"
                className="p-2.5 group rounded-full hover:bg-gray-100 me-1 dark:hover:bg-gray-600"
              >
                <Icon icon="streamline:shuffle-solid" className="text-error" />
                <span className="sr-only">Shuffle Tracks</span>
              </button>
            </div>

            <button className="p-2.5 group rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600">
              <Icon
                icon="streamline:arrow-infinite-loop-solid"
                className="text-secondary"
              />
              <span className="sr-only">Loop Tracks</span>
            </button>

            <button
              onClick={() =>
                document.getElementById("sound_modal_3").showModal()
              }
              className="p-2.5 group rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600"
            >
              <Icon
                icon="streamline:volume-level-high-solid"
                className="text-primary"
              />
              <span className="sr-only">Adjust Volume</span>
            </button>

            <dialog id="sound_modal_2" className="modal">
              <div
                className="absolute modal-box w-3 right-12 bottom-8 p-0 m-0 rounded-sm"
                style={{ height: "136px-lr" }}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  orient="vertical"
                  className="translate-y-1"
                  style={{ writingMode: "vertical-lr", direction: "rtl" }}
                />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <button
              onClick={() => document.getElementById("queue_modal").showModal()}
              className="p-2.5 group rounded-lg bg-base-100 hover:bg-gray-100 dark:hover:bg-gray-600 flex"
            >
              <Icon icon="ph:playlist-bold" className="text-primary" />
              pl
              <span className="sr-only">Open Queue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
