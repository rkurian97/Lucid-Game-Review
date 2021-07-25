import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import  ApolloClient  from 'apollo-boost';

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EditReview from "./pages/EditReview";
import FriendPosts from "./pages/FriendPosts";
import AddFriends from "./pages/AddFriends";
import NoMatch from "./pages/NoMatch";
import AddReview from './pages/AddReview'
import Nav from "./components/Nav";
// import Footer from "./components/Footer";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
            <Nav/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/addReview" component={AddReview} />
                <Route exact path="/editReview" component={EditReview} />
                <Route exact path="/friendposts" component={FriendPosts} />
                <Route exact path="/addFriends" component={AddFriends} />
                <Route component={NoMatch}/>
              </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;