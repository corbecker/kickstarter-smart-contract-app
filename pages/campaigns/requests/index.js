import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import getCampaign from '../../../ethereum/campaign';

class CampaignRequests extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = getCampaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call()
        })
    );

    return { address, requests, requestsCount };
  }
  render() {
    return (
      <Layout>
        <h3>Pending Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button primary>Add Request</Button></a></Link>
      </Layout>
    )
  }
}

export default CampaignRequests;