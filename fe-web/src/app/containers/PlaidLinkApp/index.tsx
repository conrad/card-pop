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
    const plaidLinkStore = this.props[STORE_PLAID_LINK] as PlaidLinkStore;
    plaidLinkStore.setPublicToken(token);

    // TODO: FIRST: send user back to Unity Scene with public token data.

    // TODO: LATER: send token to client server to be saved.
  }

  returnToUnity() {

  }

  render() {
    const plaidLinkStore = this.props[STORE_PLAID_LINK] as PlaidLinkStore;

    return (
      <div className="button-container">
        <PlaidLink
          publicKey={plaidLinkStore.publicKey}
          product="auth"
          env={plaidLinkStore.env}
          clientName="card-pop"
          onSuccess={this.handleOnSuccess}
          apiVersion="v2"
          buttonText="Add An Account"
          className="card-pop-button"
          />
        <button
          className="card-pop-button"
          onClick={this.returnToUnity}
        >
          <span>Return to Video Feed</span>
        </button>
      </div>
    );
  }
};

export default PlaidLinkApp;
