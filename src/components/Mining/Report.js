import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';

import ListItem from '../ListItem';
import ListItemSeparator from '../ListItemSeparator';

import { fetchPost } from '../../utils';
import Config from 'react-native-config';

import moment from 'moment';

export default class Report extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
        begin: PropTypes.string,
        end: PropTypes.string,
        timezoneOffset: PropTypes.string,
    };
    
    constructor(props) {
        super(props);
  
        this.state = {
            refreshing: false,
            reportBegin: this.props.begin,
            reportEnd: this.props.end,
            timezoneOffset: this.props.timezoneOffset,
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
            title={item.miningAmount.toString()}
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
        fetchPost(`${Config.AIC_API_URL}/service/mining/miningreport`, {
            userId: this.props.userId,
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
        .catch(error => console.log('[Error] Mining Report', error));
    }
}