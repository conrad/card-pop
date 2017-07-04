import * as React from 'react';
import * as PlaidLink from 'react-plaid-link';
import { inject, observer } from 'mobx-react';
import { PlaidLinkStore } from '../../stores';
import { STORE_PLAID_LINK } from '../../constants/stores';

export interface PlaidLinkAppProps {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_PLAID_LINK]: PlaidLinkStore;
};

export interface PlaidLinkAppState {
  /* empty */
}

@inject(STORE_PLAID_LINK)
@observer
export class PlaidLinkApp extends React.Component<PlaidLinkAppProps, PlaidLinkAppState> {
  
  constructor(props: PlaidLinkAppProps, context: any) {
    super(props, context);
  }

  handleOnSuccess(token: string, metadata) {
    // TODO: FIRST: send user back to Unity Scene with public token data.
    this.props[STORE_PLAID_LINK].setPublicToken(token);
    // TODO: LATER: send token to client server to be saved.

  }

  render() {
    const plaidLinkStore = this.props[STORE_PLAID_LINK] as PlaidLinkStore;


    return (
      <PlaidLink
        publicKey={plaidLinkStore.publicKey}
        product="auth"
        env={plaidLinkStore.env}
        clientName="card-pop"
        onSuccess={this.handleOnSuccess}
        />
    );
  }
};

export default PlaidLinkApp;
