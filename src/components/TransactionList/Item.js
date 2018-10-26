import React from 'ract';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const API_URL = 'https://api.etherscan.io/api';
const API_KEY = '7JXDJJYMCKCPBKZK5EIGA4I8XW32WMAQI5';

const getTransactions = (address, startBlock = 0, endBlock = 99999999) => (
    `${API_URL}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=1&offset=10&sort=asc&apikey=${API_KEY}`
);

const StateIcon = (state) => {
    // 'ios-arrow-dropup'
    // 'ios-arrow-dropdown'
    // 'ios-warning'
    return <Icon name={} />;
};

const Item = ({ key, data, onPress }) => (
    <ListItem
        key={key}
        leftIcon={<StateIcon />}
        title={}
        subtitle={}
        rightTitle={}
        onPress={onPress}
    />
);

Item.PropTypes = {
    key: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
};

export default Item;