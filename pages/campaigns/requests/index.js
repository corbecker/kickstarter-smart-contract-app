import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

class CampaignRequests extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button primary>New Request</Button></a></Link>
      </Layout>
    )
  }
}

export default CampaignRequests;