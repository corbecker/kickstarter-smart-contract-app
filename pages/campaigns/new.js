import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };

  render() {
    return (
      <Layout>
        <h3>Create New Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label={{ basic: true, content: 'wei' }}
              labelPosition='right'
              placeholder='Enter Minimum Wei Contribution...'
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary>CREATE</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew;