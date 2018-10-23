import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateWallet from '../components/CreateWallet';
import * as walletActions from '../store/modules/wallet';

class CreateAccountContainer extends Component {
    handleCreate = (hdkey) => {
        this.props.addWallet(hdkey);

        this.props.navigation.navigate('Home');
    };

    render() {
        return (
            <CreateWallet onCreate={this.handleCreate} />
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    addWallet: (hdkey) => dispatch(walletActions.addWallet(hdkey))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer);