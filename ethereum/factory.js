import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface, '0x480A2d354c0005cdb9bf33537aDA9Dcbf9d4d918'));
instance.options.address = '0x480A2d354c0005cdb9bf33537aDA9Dcbf9d4d918';

export default instance;