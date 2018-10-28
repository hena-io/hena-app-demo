import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Utils from '../utils';

export default class TransactionList extends Component {
    static propTypes = {
        txs: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.props.txs}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    _renderItem = ({ key, item, address }) => {
        let title = 'Error';
        let subtitle = '';
        let iconName = 'ios-warning';
        if (item.from === address) {
            title = 'Sent';
            iconName = 'ios-arrow-dropup';
            subtitle = `To: ${item.to}`;
        } else if (item.to === address) {
            title = 'Received';
            iconName = 'ios-arrow-dropdown';
            subtitle = `From: ${item.from}`;
        }
        
        return (
            <ListItem
                key={key}
                leftIcon={<Icon name={iconName} size={36}/>}
                title={title}
                subtitle={subtitle}
                rightTitle={Utils.toBalanceFormat(item.value)}
            />
        )
    }

    _keyExtractor = (item, index) => (
        item.hash
    )
}