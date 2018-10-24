import Web3 from 'web3';
import Config from 'react-native-config';

var web3 = new Web3(
    new Web3.providers.HttpProvider(
        `https://${Config.ETHEREUM_NETWORK}.infura.io/v3/${Config.INFURA_API_KEY}`
    )
);

export default web3;