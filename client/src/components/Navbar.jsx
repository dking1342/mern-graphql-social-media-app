import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

const Navbar = () => {
    let location = useLocation();
    location = location.pathname.slice(1,) === '' ? 'home' : location.pathname.slice(1,);
    const [activeItem, setActiveItem] = useState(location);
    const { user, logout } = useContext(AuthContext);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    if(!user){
      return (
          <Menu secondary as='nav' size='massive' color='teal' fixed='top' style={{background:'#fff'}} >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
              <Menu.Item
                  name='login'
                  active={activeItem === 'login'}
                  onClick={handleItemClick}
                  as={Link}
                  to='/login'
                />
              <Menu.Item
                  name='register'
                  active={activeItem === 'register'}
                  onClick={handleItemClick}
                  as={Link}
                  to='/register'
                />
          </Menu.Menu>
        </Menu>
      )
    }
    if(user){
      return(
        <Menu secondary as='nav' size='massive' color='teal' fixed='top' style={{background:'#fff'}} >
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
              <Menu.Item
                  name='logout'
                  onClick={logout}
                />
          </Menu.Menu>
        </Menu>
      )
    }
}

export default Navbar
