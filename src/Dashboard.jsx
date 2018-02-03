import React from 'react';
import { bindAll } from 'lodash';
import axios from 'axios';
const removeDuplicateAgencies = require('./helpers/removeDuplicateAgencies');
const sumDistances = require('./helpers/sumDistances');
const sortAgencyListByDistance = require('./helpers/sortAgencyListByDistance');
const createURLBatches = require('./helpers/createURLBatches');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addr1: '',
      addr2: '',
      agenciesSortedByDistance: ''
    }
    bindAll(this, 'handleChange', 'getCoordinates', 'getNearbyAgencies', 'getDistances');
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
        const latLngs = coords.map(coord => Object.values(coord.data.results[0].geometry.location).join(','));
        this.getNearbyAgencies(latLngs);
      })
      .catch(e => console.log(e));
  }

  getNearbyAgencies(latLngs) {
    const url = '/api/place/nearbysearch/json';
    const nearbyAgencies1 = axios.get(url, { params: { location: latLngs[0] } });
    const nearbyAgencies2 = axios.get(url, { params: { location: latLngs[1] } });

    Promise.all([nearbyAgencies1, nearbyAgencies2])
      .then(nearbyAgencies => {
        return nearbyAgencies.map((agency) => {return agency.data});
      })
      .then((agencyLists) => {
        this.getDistances(agencyLists);
      })
      .catch(e => console.log(e));
  }

  getDistances(agencyLists) {
    const url = '/api/distancematrix/json';
    const agencyList = agencyLists[0].concat(agencyLists[1]);
    const uniqueAgencyList = removeDuplicateAgencies(agencyList);
    const addrOrigins = `${this.state.addr1}|${this.state.addr2}`;
    const agencyAddresses = uniqueAgencyList.map((list) => list.vicinity);
    const agencyAddressesURLs = createURLBatches(agencyAddresses);
    
    const agencyDistances = agencyAddressesURLs.map((URL) => {
      return axios.get(url, { params: { origins: addrOrigins, destinations: URL, units: 'imperial' } });
    })
    
    Promise.all(agencyDistances)
      .then((responses) => {
        const summedDistances = responses.reduce((arr, distances) => {
          const rows = distances.data.rows;
          return arr.concat(sumDistances(rows));
        }, []);

        return summedDistances;
      })
      .then((summedDistances) => {
        const sortedAgencyListByDistance = sortAgencyListByDistance(uniqueAgencyList, summedDistances);
        this.setState({ agenciesSortedByDistance: sortedAgencyListByDistance});
      })
      .catch(e => console.log(e));
  }

  render() {
    const { agenciesSortedByDistance } = this.state;
    return (
      <div> 
        <form className="Search-form" onSubmit={this.getCoordinates}>
          Address 1: <input type="text" name="addr1" value={this.state.addr1} onChange={this.handleChange}/><br />
          Address 2: <input type="text" name="addr2" value={this.state.addr2} onChange={this.handleChange}/><br />
          <input type="submit" />
        </form>
      
      
        {agenciesSortedByDistance ?
          agenciesSortedByDistance.map((agency) => (
            <div key={agency.id}>{`${agency.name} | ${agency.vicinity} | Combined Distance: ${agency.distance} miles`}</div>
          )
          ) : 
          <div></div>
        }
      </div>
    )
  }
}

export default Dashboard;