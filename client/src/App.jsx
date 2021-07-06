import React from 'react';
import ApolloProvider from './config/Apollo';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <ApolloProvider>
      <Router>
          <Navbar />
          <Container className="header-drop">
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Container>
      </Router>
    </ApolloProvider>
  )
}

export default App
