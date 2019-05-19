const Web3 = require('web3');
const ganache = require('ganache-cli');
const assert = require('assert');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('1000').send({from: accounts[0], gas: '1000000'});

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it('sets campaign owner to manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it('allows contributions & marks as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '1000'
    });
    const isApprover = await campaign.methods.approvers(accounts[1]).call();
    assert.equal(true, isApprover);
  });
  it('requires a minimum contribution', async() => {
    try{
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '100'
      });
      assert(false);
    }catch(err) {
      assert(err);
    }
  });
  it('increments contributer count', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '1000'
    });
    const count = await campaign.methods.contributerCount().call();
    assert.equal(1, count);
  });
  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy Supplies','100',accounts[2])
      .send({ from: accounts[0], gas: '1000000' });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy Supplies', request.description);
  });
  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei('10', 'ether')
    });
    await campaign.methods
      .createRequest('Buy Supplies', web3.utils.toWei('5', 'ether'), accounts[2])
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '100000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    assert(balance == 105);
  });
});
