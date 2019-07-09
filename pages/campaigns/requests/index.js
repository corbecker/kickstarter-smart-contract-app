import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Grid } from 'semantic-ui-react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import getCampaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class CampaignRequests extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = getCampaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const contributerCount = await campaign.methods.contributerCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call()
        })
    );

    return { address, requests, requestsCount, contributerCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return <RequestRow 
        key={index}
        ID={index}
        request={request}
        address={this.props.address}
        contributerCount={this.props.contributerCount}
      />
    })
  }

  render() {

    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Pending Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button style={{marginBottom: 10}} floated="right" primary>Add Request</Button></a></Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>Found {this.props.requestsCount} requests.</div>
      </Layout>
    )
  }
}

export default CampaignRequests;