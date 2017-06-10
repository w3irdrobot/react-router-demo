import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import styles from './styles.css';
import Users from '../Users';

const Cms = () => (
  <div>
    <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
      <Menu.Item name="users">
        <Icon name="users" />
        User
      </Menu.Item>
    </Sidebar>
    <div className={styles.mainBody}>
      <Users />
    </div>
  </div>
);

export default Cms;
