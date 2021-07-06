import React from 'react';
import ApolloProvider from './config/Apollo';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { Button, Card, Container } from 'semantic-ui-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';




const App = () => {
  return (
    <ApolloProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <h1>Hello App</h1>
          
          <Button primary>Click me</Button>
          <Card>
            This is a card
          </Card>
        </Container>
      </Router>
    </ApolloProvider>
  )
}

export default App
