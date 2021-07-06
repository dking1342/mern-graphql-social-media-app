import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
    let location = useLocation();
    location = location.pathname.slice(1,) === '' ? 'home' : location.pathname.slice(1,);
    const [activeItem, setActiveItem] = useState(location);

    const handleItemClick = (e, { name }) => setActiveItem(name);

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

export default Navbar