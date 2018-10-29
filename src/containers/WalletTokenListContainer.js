import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as TokenActions from '../store/modules/token';
import TokenList from '../components/TokenList';

class WalletTokenListContainer extends Component {
    render() {
        return (
            <TokenList
                address={this.props.address}
                tokens={this.props.tokens}
                onPressToken={this.props.onShowTokenDetails}
            />
        );
    }
}

const extractCurrentAddress = (wallet) => (
    wallet.wallets[wallet.selectedIndex].getPublicKeyString()
)

const mapStateToProps = (state) => {console.log(state);  return ({
    tokens: state.token.tokens,
    address: extractCurrentAddress(state.wallet)
})}

const mapDispatchToProps = (dispatch) => ({
    removeToken: (index) => dispatch(TokenActions.removeToken(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletTokenListContainer);