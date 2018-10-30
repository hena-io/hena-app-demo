import RNFS from 'react-native-fs';

export const DEFAULT_WALLET_PATH = "m/44'/60'/0'/0/0";
export const WALLET_FILE_PATH = RNFS.DocumentDirectoryPath + '/wallets.txt';
export const TOKEN_FILE_PATH = RNFS.DocumentDirectoryPath + '/tokens.txt';
