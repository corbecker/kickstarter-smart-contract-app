import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface, '0x370317807f90c22279816De857E256A9eb5EB95C'));
instance.options.address = '0x370317807f90c22279816De857E256A9eb5EB95C';

export default instance;