import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import LoginRoute from './util/LoginRoute';

import Home from './components/Home/Home';
import Register from './components/Register/Register';

import Dashboard from './components/Dashboard/Dashboard';
import Recommend from './components/Recommend/Recommend';
import Profile from './components/Profile/Profile';

import StackOverflow from './components/StackOverflow/StackOverflow';
import CreatePost from './components/StackOverflow/CreatePost';
import Issue from './components/StackOverflow/Issue';
import SearchResult from './components/StackOverflow/SearchResult';

import Timeline from './components/Timeline/Timeline';
import DisplayProfile from './components/Timeline/DisplayProfile';

import Notifications from './components/Notifications/Notifications';

import './App.css';

const httpLink = createUploadLink({
	uri: 'http://localhost:5000'
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Switch>
            <LoginRoute exact path="/" component={Home} exact/>
            <LoginRoute exact path="/register" component={Register} exact/>
            <AuthRoute exact path="/dashboard" component={Dashboard} exact/>
            <AuthRoute exact path="/recommend" component={Recommend} exact/>
            <AuthRoute exact path="/profile" component={Profile} exact/>
            <AuthRoute exact path="/stack-overflow" component={StackOverflow} exact/>
            <AuthRoute exact path ="/createpost" component={CreatePost} exact/>
            <AuthRoute exact path="/issue/:postId" component={Issue} exact/>
            <AuthRoute exact path="/search" component={SearchResult} exact/>
            <AuthRoute exact path="/timeline" component={Timeline} exact/>
            <AuthRoute exact path="/profile/:username" component={DisplayProfile} exact/>
            <AuthRoute exact path="/notifications" component={Notifications} exact/>
          </Switch>
        </div>
    </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);
