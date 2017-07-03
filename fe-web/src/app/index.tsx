import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './containers/App';
import { PlaidModel } from './models/PlaidModel';
import { PlaidStore, RouterStore } from './stores';
import { STORE_PLAID, STORE_ROUTER } from './constants/stores';
//import { TodoFilter } from './constants/todos';

// enable MobX strict mode
useStrict(true);

// default fixtures for PlaidStore - Shouldn't use.
const defaultPlaidData = {
  PLAID_ENV: 'sandbox',
  PLAID_PUBLIC_KEY: 'affaskfds',
  PLAID_SECRET: 'SDFFKJHKDSAF',
  PLAID_CLIENT_KEY: 'KLH2334'
};

// prepare MobX stores
const plaidStore = new PlaidStore(defaultPlaidData);
const routerStore = new RouterStore(browserHistory);
const rootStores = {
  [STORE_PLAID]: plaidStore,
  [STORE_ROUTER]: routerStore
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
