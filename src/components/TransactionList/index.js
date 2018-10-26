import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Utils from '../../utils';

const TransactionItem = ({ address, tx }) => {
    console.log(address, tx);
    let title = 'Error';
    let subtitle = '';
    let iconName = 'ios-warning';
    if (tx.from === address) {
        title = 'Sent';
        iconName = 'ios-arrow-dropup';
        subtitle = tx.to;
    } else if (tx.to === address) {
        title = 'Received';
        iconName = 'ios-arrow-dropdown';
        subtitle = tx.from;
    }
    
    return (
        <ListItem
            leftIcon={<Icon name={iconName} size={36}/>}
            title={title}
            subtitle={subtitle}
            rightTitle={Utils.toBalanceFormat(tx.value)}
        />
    )
};

const TransactionList = ({ address, txs }) => (
    <View style={{flex: 1}}>
        <FlatList
            data={txs}
            renderItem={({index, item}) => <TransactionItem address={address} tx={item}/>}
        />
    </View>
);

export default TransactionList;