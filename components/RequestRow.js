import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from '../routes';
import web3 from '../ethereum/web3';

class RequestRow extends Component {

  render() {
    
    const { description, value, recipient, approvalCount } = this.props.request;

    return (
      <Table.Row>
        <Table.Cell>{this.props.ID}</Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
        <Table.Cell>{recipient}</Table.Cell>
        <Table.Cell>{approvalCount}/{this.props.contributerCount}</Table.Cell>
        <Table.Cell>Approve Request</Table.Cell>
        <Table.Cell>Finalize Request</Table.Cell>
      </Table.Row>
    )
  }
}

export default RequestRow;