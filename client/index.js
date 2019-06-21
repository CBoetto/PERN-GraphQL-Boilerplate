import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './app';
import history from './history';
import store from './store';
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

const link = createHttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'same-origin'
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
})

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <Router history={history}>
                <Route exact path ="/" component={App} />
            </Router>
        </ApolloProvider>
    </Provider>,
    document.getElementById('app')
)