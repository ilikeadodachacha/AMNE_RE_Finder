import React from 'react';
import { bindAll } from 'lodash';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addr1: '',
      addr2: '',
      agencies: ''
    }
    bindAll(this, 'handleChange');
  }

  handleChange(e) {
    e.preventDefault();
    const thisState = this.state;
    const name = e.target.name;
    const val = e.target.value;
    thisState[name] = val;
    this.setState(thisState);
  }

  render() {
    return (
      <div> 
        <form className="Search-form">
          Address1: <input type="text" name="addr1" value={this.state.addr1} onChange={this.handleChange}/><br />
          Address2: <input type="text" name="addr2" value={this.state.addr2} onChange={this.handleChange}/><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Dashboard;