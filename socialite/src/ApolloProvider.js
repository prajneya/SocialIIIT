import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import { onError } from 'apollo-link-error'

import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

import './App.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/dashboard" component={Dashboard} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);
