import React from 'react';
import Track from '../Track/track';
import './trackList.css';

class TrackList extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div className="TrackList">
        {
            this.props.tracks.map((track) => (
              <Track
                track={track}
                key={track.id}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
              />
            ))
        }
      </div>
    );
  }
}

export default TrackList;
