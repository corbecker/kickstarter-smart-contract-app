import React, { Component } from 'react';
import instance from '../ethereum/factory';

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      campaigns: []
    }
  }

  async componentDidMount() {
    const campaigns = await instance.methods.getDeployedCampaigns().call();
    this.setState({campaigns});
  }
  render() {
    return (
      <h1>{this.state.campaigns}</h1>
    )
  }
}

export default App;