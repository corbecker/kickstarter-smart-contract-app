import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface, '0x06c0e15a7c66c1af2e5de7ccb4690ab90211fcce'));
instance.options.address = '0x06c0e15a7c66c1af2e5de7ccb4690ab90211fcce';

export default instance;