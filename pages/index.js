import React, { Component } from 'react';
import instance from '../ethereum/factory';

class App extends Component{

  static async getInitialProps() {
    const campaigns = await instance.methods.getDeployedCampaigns().call();
    return {campaigns};
  }

  constructor(props) {
    super(props);

    this.state = {
      campaigns: props.campaigns
    }
  }

  render() {
    return (
      <h1>{this.state.campaigns}</h1>
    )
  }
}

export default App;