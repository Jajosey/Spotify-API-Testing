import React, {Component} from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

import './App.css';
import Profile from './Profile.jsx'
import Gallery from './Gallery.jsx'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
          console.log('this.state', this.state);
          const BASE_URL = 'https://api.spotify.com/v1/search?';
          let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
          const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
          let accessToken = 'BQALeDiMAHQ6isyHoRQkf9zMwWHmWI03CB--kVZ0nSGXbBymeJN17M4zxt2gOZg0NJ28Xz3b4p1CpwEGTR_J9KVWtCd3rfQincQytDo5-7OMgVKSLyC3AJKMMq8QdBwCPPkIuZQTfUXu7T-1mPc8t0ZpcAaTKUJjvg&refresh_token=AQAxuir5iJ0qdZz9XStP2ql-0bFws9hDTJS2zSsDg8JKaZGDIo6O8Bdjr1Ir72UbUJTC4hgEU2NQQth4zThPHv3aysxWniNoHJ8SWFYLtTz5mJ9PIg1CRVEFrr2ydI-zdZI'
          console.log('Fetch_URL', FETCH_URL);

          fetch(FETCH_URL, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(json =>{
            const artist = json.artists.items[0];
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`

            fetch(FETCH_URL, {
              method: 'GET'
            })
            .then(response => response.json())
            .then(json => {
              console.log('artist\'s top tracks:', json);
              const {tracks} = json;
              this.setState({tracks});
            })
          });
      }

  render(){
    return(
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type = "text"
              placeholder = "Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter'){
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
        this.state.artist !== null
        ?
        <div>
         <Profile
          artist={this.state.artist}
         />
         <Gallery
           tracks={this.state.tracks}
         />
        </div>
        : <div></div>
      }

    </div>
    )
  }
}

export default App;
