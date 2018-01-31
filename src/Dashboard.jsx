import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addr1: '',
      addr2: '',
      agencies: ''
    }
  }

  handleChange(e) {
    e.preventDefault();
    console.log('handle change hit!')
  }

  render() {
    return (
      <div> 
        <form className="Search-form">
          Address1: <input type="text" name="addr1" value="test" onChange={this.handleChange}/><br />
          Address2: <input type="text" name="addr2" value="test" onChange={this.handleChange}/><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Dashboard;