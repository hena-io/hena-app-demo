import React from 'react';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Utils from '../utils';

const ICON_SIZE = 36;

export default TransactionListItem = ({ key, item, symbol, decimals }) => (
    <ListItem
        key={key}
        leftIcon={<Icon name={getIconName(item.status)} size={ICON_SIZE}/>}
        title={item.status}
        subtitle={getSubtitle(item)}
        rightTitle={`${Utils.toBalanceFormat(item.value, decimals)} ${symbol}`}
        bottomDivider={true}
    />
)

const getIconName = (status) => {
    switch (status) {
        case 'Sent': return 'ios-log-out';
        case 'Receive': return 'ios-log-in';
        case 'Error': return 'ios-warning';
        case 'Contract': return 'ios-papaer';
    }

    return 'ios-help-circle-outline';
}

const getSubtitle = (tx) => {
    if (tx.status === 'Error' || tx.status === 'Unknown') {
        return tx.raw.contractAddress ? 'Deploy smart contract' : '';
    }

    return tx.status === 'Receive' ? `From: ${addressShorter(tx.from)}` : `To: ${addressShorter(tx.to)}`;
}

const addressShorter = (address) => (
    `${address.substring(0, 10)}...${address.substring(address.length - 10, address.length)}`
)