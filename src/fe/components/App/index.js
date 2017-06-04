import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import styles from './styles.css';
import UserEdit from '../UserEdit';

const App = () => (
  <div id="app">
    <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
      <Menu.Item name="users">
        <Icon name="users" />
        User
      </Menu.Item>
    </Sidebar>
    <div className={styles.mainBody}>
      <UserEdit />
    </div>
  </div>
);

export default App;
