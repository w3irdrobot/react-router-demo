import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import styles from './styles.css';
import Users from '../Users';

const Cms = () => (
  <div>
    <Helmet>
      <title>CMS</title>
    </Helmet>

    <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
      <Menu.Item name="users">
        <Icon name="users" />
        Users
      </Menu.Item>
    </Sidebar>
    <div className={styles.mainBody}>
      <Users />
    </div>
  </div>
);

export default Cms;
