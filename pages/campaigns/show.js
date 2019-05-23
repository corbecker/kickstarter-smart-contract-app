import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Grid, Card, Button } from 'semantic-ui-react';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

  static async getInitialProps(props) {
    const campaign = getCampaign(props.query.address);
    const summary = await campaign.methods.summary().call();

    //returns to props
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requests: summary[2], 
      contributors: summary[3],
      manager: summary[4],
      address: props.query.address
    };
  }

  renderCards() {

    const items = [
      {
        header: this.props.manager,
        meta: 'Address of Manager',
        description: 'The Manager is the owner/creator of this campaign.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: this.props.minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'Must contribute this much wei to become an approver.',
      },
      {
        header: this.props.requests,
        meta: 'Number of Requests',
        description: 'A request will seek approval to withdraw money from a contract for a specified purpose.',
      },
      {
        header: this.props.contributors,
        meta: 'Number of Contributors',
        description: 'Number of people who have donated to this campaign.',
      },
      {
        header: web3.utils.fromWei(this.props.balance, 'ether'),
        meta: 'Campaign Balance (Ether)',
        description: 'The balance is how much money this campaign has left to spend.'
      }
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <Grid stackable columns={2}>
          <Grid.Column width={10}>
          <h3>Campaign Details</h3>
          {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <h3>Contribute to this Campaign</h3>
            <ContributeForm address={this.props.address}></ContributeForm>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column>
            <Link route={`/campaigns/${this.props.address}/requests`}><a><Button primary>View Requests</Button></a></Link>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;