import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import ListItemSeparator from '../ListItemSeparator';

import { fetchPost } from '../../utils';
import Config from 'react-native-config';

export default class History extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            history: [],
            page: 0,
            offset: 100,
            refreshing: false,
        };
    }

    componentWillMount() {
        console.log(this.props.userId);
        this.refresh();
    }

    render() {
        return (
            <FlatList
                data={this.state.history}
                renderItem={this._renderListItem}
                keyExtractor={item => item.adHistoryId}
                ItemSeparator={ListItemSeparator}
                refreshControl={this.renderRefreshControl()}
            />       
        );
    }

    _renderListItem = ({ index, item }) => {
        return (
            <ListItem
                title={`${item.adDesignType} / ${item.campaignType}`}
                subtitle={item.createTime}
                rightTitle={`${item.customerRevenue} HENA`}
                bottomDivider={true}
            />
        );
    }

    renderRefreshControl = () => (
        <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
        />
    )

    refresh = () => {
        this.loadHistory(
            this.state.page,
            this.state.offset
        );
    }

    loadHistory = (page, offset) => {
        fetchPost(`${Config.AIC_API_URL}/service/users/aichistory`, {
            userId: this.props.userId,
            isPublisherReport: false,
            offset: page,
            count: offset
        })
        .then(response => {
            console.log('AIC', response);
            if (response.success) {
                this.setState({
                    history: response.data.items.filter(
                        item => (item.customerRevenue > 0)
                    )
                });
            }
        })
        .catch(error => console.log('[Error] AIC History', error));
    }
}