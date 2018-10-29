import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl,
} from 'react-native';

import TokenListItem from './TokenListItem';

export default class TokenList extends Component {
    static propTypes = {
        address: PropTypes.string.isRequired,
        tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
        listStyle: View.propTypes.style,
        onPressToken: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.tokens}
                    renderItem={this._renderToken}
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.forceUpdate()}
                        />
                    }
                />
            </View>
        )
    }

    _renderToken = ({index, item}) => {
        const {
            address,
            onPressToken,
        } = this.props;
        
        return (
            <TokenListItem
                index={index}
                item={item}
                address={address}
                onPress={() => onPressToken(item.name, address, index, item)}
            />
        );
    }

    _keyExtractor = (value, index) => (
        index.toString()
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});