import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface, '0x485b263F6CB5760DcE14e71254157e7007149F35'));
instance.options.address = '0x485b263F6CB5760DcE14e71254157e7007149F35';

export default instance;