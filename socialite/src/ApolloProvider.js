import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

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

import CreateBlog from './components/Blog/CreateBlog';
import Blog from './components/Blog/Blog';

import Timeline from './components/Timeline/Timeline';
import DisplayProfile from './components/Timeline/DisplayProfile';

import Notifications from './components/Notifications/Notifications';

import CheckMail from './components/Verify/checkMail';
import Verify from './components/Verify/Verification';

import FriendSearch from './components/FriendSearch/FriendSearch';
import UserSearchResult from './components/FriendSearch/UserSearchResult';

import NotFound from './components/ErrorPages/NotFound';

import './App.css';

const httpLink = createUploadLink({
	uri: '/api'
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
            <LoginRoute exact path="/" component={Home} />
            <LoginRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <AuthRoute exact path="/recommend" component={Recommend} />
            <AuthRoute exact path="/profile" component={Profile} />
            <AuthRoute exact path="/querify" component={StackOverflow} />
            <AuthRoute exact path ="/createpost" component={CreatePost} />
            <AuthRoute exact path="/createblog" component={CreateBlog} />
            <AuthRoute exact path="/issue/:postId" component={Issue} />
            <AuthRoute exact path="/search" component={SearchResult} />
            <AuthRoute exact path="/timeline" component={Timeline} />
            <AuthRoute exact path="/profile/:username" component={DisplayProfile} />
            <AuthRoute exact path="/notifications" component={Notifications} />
            <AuthRoute exact path="/marauder" component={FriendSearch} />
            <AuthRoute exact path="/marauder/search" component={UserSearchResult} />
            <Route exact path="/blog/:blogId" component={Blog} />
            <LoginRoute exact path="/checkMail" component={CheckMail} />
            <LoginRoute exact path="/verify/:token" component={Verify} />
            <Route path="" component={NotFound} />
          </Switch>
        </div>
    </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);
