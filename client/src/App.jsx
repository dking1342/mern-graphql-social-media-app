import React from 'react';
import ApolloProvider from './config/Apollo';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/auth';
import PublicRoute from './components/PublicRoute';
import SinglePost from './pages/SinglePost';

const App = () => {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
            <Navbar />
            <Container className="header-drop">
              <Route exact path='/' component={Home}/>
              <PublicRoute exact path='/login' component={Login} />
              <PublicRoute exact path='/register' component={Register} />
              <Route exact path="/post/:postId" component={SinglePost} />
            </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
