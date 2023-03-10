/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */

const clientId = '61d043ec2e2442a4b14bf9ba37a26a5d';
const redirectUri = 'https://spotify-playlist-marina.netlify.app/';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Checks for access token match. Each returned value will be an array.
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //  Clears parameters and allows us to grab new Access Token when one expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  },

  async search(term) {
    if (!accessToken) {
      accessToken = await Spotify.getAccessToken();
    }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}
    `, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json()).then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    });
  },

  async savePlayList(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    if (!accessToken) {
      accessToken = await Spotify.getAccessToken();
    }
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({ name }),
          },
        )
          .then((response) => response.json()).then((resp) => {
            const playlistId = resp.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris }),
            });
          });
      });
  },
};
export default Spotify;
