import React, { Component } from 'react';
import instance from '../ethereum/factory';
import { Card, Button, Grid } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

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
        description: (
          <Link route={`campaigns/${address}`}><a>View Campaign</a></Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />

  }

  render() {
    return (
      <Layout>
        <h3>Open Campaigns</h3>
        <Grid stackable columns={2}>
          <Grid.Column width={12}>
            <div>{this.renderCampaigns()}</div>
          </Grid.Column>
          <Grid.Column width={4}>
            <Link route="/campaigns/new">
              <a><Button content="CREATE CAMPAIGN" icon="plus" primary/></a>
            </Link>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default App;