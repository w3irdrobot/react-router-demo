import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

const App = () =>
  <Sidebar as={Menu} inverted visible vertical width='thin' icon='labeled'>
    <Menu.Item name='users'>
      <Icon name='users' />
      Users
    </Menu.Item>
  </Sidebar>;

export default App;
