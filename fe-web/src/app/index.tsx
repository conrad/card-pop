import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './containers/App';
import { PlaidLinkApp } from './containers/PlaidLinkApp';
import { PlaidLinkStore } from './stores';
import { STORE_PLAID_LINK } from './constants/stores';
import { PUBLIC_KEY } from './credentials/pubKey';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const plaidLinkStore = new PlaidLinkStore(PUBLIC_KEY, 'sandbox');    // dummy params. shouldn't use.
const rootStores = {
  [STORE_PLAID_LINK]: plaidLinkStore
};

ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={browserHistory} >
      <Route path='/' component={App} >
        <IndexRoute component={PlaidLinkApp} />
      </Route>
    </Router>
  </Provider >,
  document.getElementById('root')
);
