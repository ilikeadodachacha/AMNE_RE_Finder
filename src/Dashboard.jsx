import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div> 
        <form className="Search-form">
          Address1: <input type="text" name="addr1" value="test"/><br />
          Address2: <input type="text" name="addr2" value="test"/><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default Dashboard;