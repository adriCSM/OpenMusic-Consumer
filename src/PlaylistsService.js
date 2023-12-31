const { Pool } = require('pg');
require('dotenv').config();
class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: 'SELECT id,name FROM playlists WHERE id=$1',
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getSongs(playlistId) {
    const query = {
      text: 'SELECT songs.id,songs.title,songs.performer FROM playlist_songs LEFT JOIN songs ON songs.id=playlist_songs.song_id WHERE  playlist_id=$1',
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getPlaylistSongs(playlistId) {
    const playlist = await this.getPlaylist(playlistId);
    const songs = await this.getSongs(playlistId);
    playlist.songs = songs;
    const playlistSongs = {
      playlist,
    };
    return playlistSongs;
  }
}

module.exports = PlaylistsService;
