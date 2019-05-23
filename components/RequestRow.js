import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import web3 from '../ethereum/web3';
import getCampaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {

  state = {
    approveLoading: false,
    finalizeLoading: false,
  }

  onApprove = async () => {
    const campaign = getCampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    this.setState({approveLoading: true});
    try{
      await campaign.methods.approveRequest(this.props.ID).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch(err){
      console.log(err)
    }
    this.setState({ approveLoading: false });
    Router.pushRoute(`campaigns/${this.props.address}/requests`);
  }

  onFinalize = async () => {
    this.setState({finalizeLoading: true});
    const campaign = getCampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    try{
      await campaign.methods.finalizeRequest(this.props.ID).send({
        from: accounts[0],
        value: this.props.request.value
      })
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }catch(err) {
      console.log(err)
    }
    this.setState({finalizeLoading: false});

  }

  render() {
    
    const { description, value, recipient, approvalCount, complete } = this.props.request;
    const readyToFInalize = approvalCount > (this.props.contributerCount / 2);

    return (
      <Table.Row disabled={complete} positive={readyToFInalize && !complete}>
        <Table.Cell>{this.props.ID}</Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
        <Table.Cell>{recipient}</Table.Cell>
        <Table.Cell>{approvalCount}/{this.props.contributerCount}</Table.Cell>
        <Table.Cell>
        {complete ? null : (
          <Button onClick={this.onApprove} color="green" basic loading={this.state.approveLoading}>Approve</Button>
        )}
        </Table.Cell>
        <Table.Cell>
        {complete ? null : (
          <Button onClick={this.onFinalize} color="teal" basic loading={this.state.finalizeLoading}>Finalize</Button>
        )}
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default RequestRow;  