/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* slint-disable-next-line consistent-return */

import React from 'react';
import './searchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyDown={(e) => (e.key === 'Enter' ? this.search() : null)} />
        <button type="button" className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}
export default SearchBar;
