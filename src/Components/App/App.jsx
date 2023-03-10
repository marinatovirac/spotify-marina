import React from 'react';
import './app.css';
import SearchBar from '../SearchBar/searchBar';
import SearchResults from '../SearchResults/searchResults';
import Playlist from '../Playlist/playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack = (track) => {
    const tracks = this.state.playlistTracks;
    if (tracks.find((savedTracks) => savedTracks.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({
      playlistTracks: tracks,
    });
  };

  removeTrack = (track) => {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((i) => i.id !== track.id);
    this.setState({
      playlistTracks: tracks,
    });
  };

  updatePlaylistName = (name) => {
    this.setState({
      playlistName: name,
    });
  };

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      });
    });
    document.querySelectorAll('input')[1].value = 'New Playlist';
  }

  // eslint-disable-next-line class-methods-use-this
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <span className="highlight">Spotify</span>
          Playlist
        </h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
