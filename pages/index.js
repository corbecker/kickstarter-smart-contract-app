import React, { Component } from 'react';
import instance from '../ethereum/factory';
import { Card, Button, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';

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
  
  renderCampaigns() {

    const items = this.state.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />

  }

  render() {
    return (
      <Layout>
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <h3>Open Campaigns</h3>
        <div>{this.renderCampaigns()}</div>
        <Button
          content="CREATE CAMPAIGN"
          icon="plus"
          primary
        />

      </div>
      </Layout>
    )
  }
}

export default App;