const STATE = {
    playlist: [],
    playlistIndex: -1,
}

export const { state, getter, mutation, ...store } = createStore('playlist', STATE)

export const getPlaylist = getter('getPlaylist', state => {
    return playlist
})

export const getPlaylistIndex = getter('getPlaylistIndex', state => {
    return playlistIndex
})

export const addTrackToPlaylist = mutation<string>('addTrackToPlaylist', (state, payload) => {
    state.playlist.push(payload)
})

export const addPlaylistIndex = mutation<string>('addPlaylistIndex', (state, payload) => {
    state.playlistIndex += 1
})

export const setPlaylistIndex = mutation<string>('setPlaylistIndex', (state, payload) => {
    state.playlistIndex = payload
})
