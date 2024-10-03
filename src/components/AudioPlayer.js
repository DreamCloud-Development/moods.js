import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTrackToPlaylist,
  setPlaylistIndex,
  getPlaylist,
} from "../stores/playlist";
import { Icon } from "@iconify/react";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { playlist, playlistIndex } = useSelector((state) => state.playlist);

  const [trackData, setTrackData] = useState("");
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

  const currentTrackData = useMemo(() => trackData, [trackData]);

  return (
    <div>
      {playlistIndex !== -1 && (
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



                    <div class="flex items-center justify-center mx-auto mb-1 self-end">
                        <button data-tooltip-target="tooltip-expand" type="button" onclick="sound_modal_3.showModal()"
                            class="p-2.5 mr-8 md:hidden group rounded-full hover:bg-gray-100 me-1 dark:hover:bg-gray-600">
                            <Icon name="streamline:volume-level-high-solid" class="text-primary" />
                            <span class="sr-only">Adjust Volume</span>
                        </button>
                        <dialog id="sound_modal_1" class="modal">
                            <div class="absolute modal-box w-5 left-4 bottom-8 p-0 m-0 rounded-sm"
                                style="height: 136px;">
                                <input type="range" min="0" max="1" step="0.1" orient="vertical" class="translate-y-1"
                                    style="writing-mode: vertical-lr; direction: rtl" v-model="currentVolume"
                                    @input="updateCurrentVolume();" />
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                        <dialog id="sound_modal_3" class="modal">
                            <div class="absolute bottom-28 modal-box flex items-center gap-2 p-2 rounded-lg w-10/12">
                                <Icon name="streamline:volume-mute-solid" />
                                <input type="range" min="0" max="1" step="0.01" class="range" v-model="currentVolume"
                                    @input="updateCurrentVolume();" />
                                <Icon name="streamline:volume-level-high-solid" />
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                        <div class="tooltip" data-tip="Not Implemented">
                            <button data-tooltip-target="tooltip-shuffle" type="button"
                                class="p-2.5 group rounded-full me-1">
                                <Icon name="streamline:play-list-folder-solid" class="text-error" />
                                <span class="sr-only">Add to Playlist</span>
                            </button>
                        </div>


                        <button @click="redoTrack();" data-tooltip-target="tooltip-previous" type="button"
                            class="p-2.5 group rounded-full">
                            <Icon name="streamline:button-previous-solid" class="text-primary" />
                            <span class="sr-only">Previous Song</span>
                        </button>


                        <button @click="playPauseButton();" data-tooltip-target="tooltip-pause" type="button"
                            class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-primary rounded-lg">
                            <Icon
                                :name="audioPlayer.paused ? 'streamline:button-play-solid' : 'streamline:button-pause-2-solid'"
                                class="text-primary-content" />
                            <span class="sr-only">Pause Song</span>
                        </button>

                        <button @click="skipTrack();" data-tooltip-target="tooltip-next" type="button"
                            class="p-2.5 group rounded-full">
                            <Icon name="streamline:button-next-solid" class="text-primary" />
                            <span class="sr-only">Next Song</span>
                        </button>

                        <div class="tooltip" data-tip="Not Implemented">
                            <button data-tooltip-target="tooltip-restart" type="button"
                                class="p-2.5 group rounded-full ">
                                <Icon name="streamline:hearts-symbol-solid" class="text-error" />
                                <span class="sr-only">Add to Favorites</span>
                            </button>
                        </div>


                        <button data-tooltip-target="tooltip-volume" type="button" onclick="queue_modal.showModal()"
                            class="p-2.5 ml-8 md:hidden group rounded-lg bg-base-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Icon name="ph:playlist-bold" class="text-primary" />
                            {{ playlist.length }}
                            <span class="sr-only">Open Queue</span>
                        </button>
                        <dialog id="queue_modal" class="modal">
                            <div class="modal-box h-96 w-96 relative overflow-y-auto">
                                <h3 class="font-bold text-lg">My Queue</h3>
                                <div v-if="state.playlistIndex != -1 ">
                                    <div v-if="bulkTrackData" v-for="track in bulkTrackData">
                                        <SongCardMinimal :trackParsedData=track />
                                    </div>
                                </div>
                                <div class="flex justify-center gap-2 z-10 sticky bottom-0">
                                    <button @click="shuffleButton();" data-tooltip-target="tooltip-captions"
                                        type="button"
                                        class="btn w-1/2 inline-block p-0 rounded-lg text-error z-20">
                                        <Icon name="streamline:shuffle-solid" class="text-error" />
                                        Shuffle Tracks
                                    </button>
                                    <button @click="loopButton();" data-tooltip-target="tooltip-captions" type="button"
                                        :class="[isLooped ? 'btn btn-success w-1/2 inline-block p-0 rounded-lg z-20' : 'btn btn-default w-1/2 inline-block p-0 rounded-lg z-20']">
                                        <Icon name="streamline:arrow-infinite-loop-solid"
                                            :class="[isLooped ? 'text-primary' : 'text-secondary']" />
                                        Loop Tracks
                                    </button>
                                </div>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                    <div class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex">
                            {{ new Date(currentTime * 1000).toISOString().substring(14, 19) }}</span>
                        <div class="w-full bg-base-100 rounded-full h-1.5">
                            <div class="bg-primary h-1.5 rounded-full" :style="{ width: musicBarWidth + '%' }">
                            </div>
                        </div>
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex">
                            {{ new Date(trackData.duration * 1000).toISOString().substring(14, 19) }}</span>
                    </div>

                </div>

          </div>
          <div className="items-center justify-center hidden ms-auto md:flex">
            <div class="tooltip" data-tip="Not Implemented">
              <button
                data-tooltip-target="tooltip-playlist"
                type="button"
                className="p-2.5 group rounded-full hover:bg-gray-100 me-1 dark:hover:bg-gray-600"
              >
                <Icon icon="streamline:shuffle-solid" class="text-error" />
                <span className="sr-only">Shuffle Tracks</span>
              </button>
            </div>

            <button className="p-2.5 group rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600">
              <Icon
                icon="streamline:arrow-infinite-loop-solid"
                class="text-secondary"
              />
              <span className="sr-only">Loop Tracks</span>
            </button>

            <button
              onclick="sound_modal_3.showModal()"
              className="p-2.5 group rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600"
            >
              <Icon
                icon="streamline:volume-level-high-solid"
                class="text-primary"
              />
              <span className="sr-only">Adjust Volume</span>
            </button>

            <dialog id="sound_modal_2" class="modal">
              <div
                className="absolute modal-box w-3 right-12 bottom-8 p-0 m-0 rounded-sm"
                style={{height: '136px-lr'}}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  orient="vertical"
                  className="translate-y-1"
                  style={{writingMode: 'vertical-lr', direction: 'rtl'}}
                />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <button
              onclick="queue_modal.showModal()"
              className="p-2.5 group rounded-lg bg-base-100 hover:bg-gray-100 dark:hover:bg-gray-600 flex"
            >
              <Icon icon="ph:playlist-bold" className="text-primary" />
              pl
              <span className="sr-only">Open Queue</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
