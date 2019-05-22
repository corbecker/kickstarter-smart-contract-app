import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Grid } from 'semantic-ui-react';
import instance from '../../ethereum/factory';

class CampaignShow extends Component {

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