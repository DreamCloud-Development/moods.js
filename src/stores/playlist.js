import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch the playlist
export const getPlaylist = createAsyncThunk(
  'playlist/getPlaylist',
  async () => {
    // Fetch the playlist data from localStorage
    const playlistData = localStorage.getItem('playlist');
    const playlistIndex = localStorage.getItem('playlistIndex');
    return {
      playlist: playlistData ? JSON.parse(playlistData) : [],
      playlistIndex: playlistIndex ? parseInt(playlistIndex) : 0,
    };
  }
);

// Playlist slice
const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlist: [],
    playlistIndex: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addTrackToPlaylist: (state, action) => {
      const track = action.payload;
      const playlist = state.playlist.length > 0 ? state.playlist : [];
      playlist.push(track);
      state.playlist = playlist;
      state.playlistIndex = playlist.length > 0 ? 1 : 0;

      // Save the updated playlist and playlistIndex to localStorage
      localStorage.setItem('playlist', JSON.stringify(state.playlist));
      localStorage.setItem('playlistIndex', state.playlistIndex.toString());
    },
    setPlaylistIndex: (state, action) => {
      state.playlistIndex = action.payload;

      // Save the updated playlistIndex to localStorage
      localStorage.setItem('playlistIndex', action.payload.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.playlist;
        state.playlistIndex = action.payload.playlistIndex;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTrackToPlaylist, setPlaylistIndex } = playlistSlice.actions;
export default playlistSlice.reducer;