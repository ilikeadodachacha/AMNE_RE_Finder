import React from 'react';
import { bindAll } from 'lodash';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addr1: '',
      addr2: '',
      agencies: ''
    }
    bindAll(this, 'handleChange', 'getCoordinates', 'getNearbyAgencies');
  }

  handleChange(e) {
    e.preventDefault();
    const thisState = this.state;
    const name = e.target.name;
    const val = e.target.value;
    thisState[name] = val;
    this.setState(thisState);
  }

  getCoordinates(e) {
    e.preventDefault();
    const url = '/api/geocode/json';
    const coord1 = axios.get(url, { params: { address: this.state.addr1 } });
    const coord2 = axios.get(url, { params: { address: this.state.addr2 } });
    axios.all([coord1, coord2])
      .then(coords => {
        const latLngs = coords.map(coord => coord.data.results[0].geometry.location);
        this.getNearbyAgencies(latLngs);
      });
  }

  getNearbyAgencies(latLngs) {
    console.log(latLngs);
  }

  render() {
    return (
      <div> 
        <form className="Search-form" onSubmit={this.getCoordinates}>
          Address 1: <input type="text" name="addr1" value={this.state.addr1} onChange={this.handleChange}/><br />
          Address 2: <input type="text" name="addr2" value={this.state.addr2} onChange={this.handleChange}/><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Dashboard;