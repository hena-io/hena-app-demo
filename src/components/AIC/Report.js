import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';

import ListItem from '../ListItem';
import ListItemSeparator from '../ListItemSeparator';

import { fetchPost } from '../../utils';
import Config from 'react-native-config';

export default class Report extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };
    
    constructor(props) {
        super(props);
  
        this.state = {
            refreshing: false,
            reportBegin: '2018-10-01 00:00:00',
            reportEnd: '2018-11-01 00:00:00',
            timezoneOffset: '09:00:00',
            report: [],
        };
    }

    componentWillMount() {
        this.refresh();
    }

    render() {
        return (
            <FlatList
                data={this.state.report}
                renderItem={this.renderListItem}
                keyExtractor={item => item.reportDate}
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
            title={`${item.revenue} (Watch: ${item.displayCount} / Click: ${item.clickCount})`}
            subtitle={item.reportDate}
        />
    )

    refresh = () => {
        this.loadReport(
            this.state.reportBegin,
            this.state.reportEnd,
            this.state.timezoneOffset,
        );
    }

    loadReport = (beginTime, endTime, timezoneOffset) => {
        fetchPost(`${Config.AIC_API_URL}/service/users/aicrevenuereport`, {
            userId: this.props.userId,
            isPublisherREport: false,
            beginTime: beginTime,
            endTime: endTime,
            timeZoneOffset: timezoneOffset
        })
        .then(response => {
            if (response.success) {
                this.setState({
                    report: response.data.items
                });
            }
        })
        .catch(error => console.log('[Error] AIC Report', error));
    }
}