var React = require('react');
var PlaidLink = require('react-plaid-link');
import { PlaidLinkStore } from '../../stores';

import * as React from 'react';

export interface PlaidLinkAppProps {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_PLAID_LINK]: PlaidLinkStore;
};

export interface PlaidLinkAppState {
  /* empty */
}

@inject(STORE_PLAID)
@observer
export class PlaidLinkApp extends React.Component<PlaidLinkAppProps, PlaidLinkAppState> {
  
  constructor(props: PlaidLinkAppProps, context: any) {
    super(props, context);
  }


  handleOnSuccess(token: string, metadata) {
    // TODO: FIRST: send user back to Unity Scene with public token data.

    // TODO: LATER: send token to client server to be saved.

  }

  render() {
    const plaidLinkStore = this.props[STORE_PLAID_LINK] as PlaidLinkStore;


    return (
      <PlaidLink
        publicKey={plaidLinkStore.}
        product="auth"
        env="tartan"
        clientName="card-pop"
        onSuccess={this.handleOnSuccess}
        />
    );
  }
};

export default PlaidLinkApp;
