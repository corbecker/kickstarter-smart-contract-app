import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Grid } from 'semantic-ui-react';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    const accounts = await web3.eth.getAccounts();
    const campaign = getCampaign(props.query.address);
    const { 0: minimumContribution, 1: balance, 2: requests, 3: contributers, 4: manager} = await campaign.methods.summary().call();
    console.log(minimumContribution);
    return {};
  }

  render() {
    return (
      <Layout>
        <Grid stackable columns={2}>
          <Grid.Column width={12}>
          <h3>Campaign Details</h3>

          </Grid.Column>
          <Grid.Column width={4}>
            <h3>Contribute to this Campaign</h3>
          </Grid.Column>
        </Grid>

      </Layout>
    )
  }
}

export default CampaignShow;