import React, {Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import getCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';


class ContributeForm extends Component {

  state = {
    loading: false,
    contribution: '',
    errorMessage: ''
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ''});
    try{
      const accounts = await web3.eth.getAccounts();
      const campaign = getCampaign(this.props.address);
      await campaign.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.contribution, 'ether')
        });
      Router.replaceRoute(`/campaigns/${this.props.address}`);//redirect to homepage
    }catch(err) {
      this.setState({errorMessage: err.message})
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.contribution}
            onChange={event => {this.setState({contribution: event.target.value})}}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Contribute</Button>
      </Form>
    )
  }
}

export default ContributeForm;
