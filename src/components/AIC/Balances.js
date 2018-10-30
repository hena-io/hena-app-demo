import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';

import ListItem from '../ListItem';
import ListItemSeparator from '../ListItemSeparator';

import { fetchPost } from '../../utils';
import Config from 'react-native-config';

export default class Balances extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };
    
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            balances: [],
        };
    }

    componentWillMount() {
        this.refresh();
    }

    render() {
        return (
            <FlatList
                data={this.state.balances}
                renderItem={this.renderListItem}
                keyExtractor={(item) => item.createTime}
                ItemSeparatorComponent={ListItemSeparator}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.refresh}
                    />
                }
            />
        );
    }

    renderListItem = ({ index, item }) => (
        <ListItem
            title={`${item.currencyType}: ${item.amount}`}
            subtitle={item.createTime}
        />
    )

    refresh = () => {
        this.loadReport();
    }

    loadReport = () => {
        fetchPost(`${Config.AIC_API_URL}/service/users/balances`, {
            userId: this.props.userId,
        })
        .then(response => {
            if (response.success) {
                this.setState({
                    balances: response.data.balances
                });
            }
        })
        .catch(error => console.log('[Error] AIC Report', error));
    }
}