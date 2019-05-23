import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface, '0x713C944D928E89010C472Cf7Ea11f7282513FFdd'));
instance.options.address = '0x713C944D928E89010C472Cf7Ea11f7282513FFdd';

export default instance;