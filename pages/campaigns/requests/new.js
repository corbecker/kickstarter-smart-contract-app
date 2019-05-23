import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import getCampaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {

  static getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  state = {
    loading: false,
    errorMessage: '',
    recipient: '',
    description: '',
    value: ''
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const campaign = await getCampaign(this.props.address);
    this.setState({loading: true});
    try{
      await campaign.methods
        .createRequest(
          this.state.description, 
          web3.utils.toWei(this.state.value), 
          this.state.recipient)
        .send({ from: accounts[0] })
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
    }catch (err) {
      this.setState({errorMessage: err.message})
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}><a>Back</a></Link>
        <h3>New Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => {this.setState({description: event.target.value})}}
            />
          </Form.Field>
          <Form.Field>
            <label>Value (Ether)</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.value}
              onChange={event => {this.setState({value: event.target.value})}}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => {this.setState({recipient: event.target.value})}}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Contribute</Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew;