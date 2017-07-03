/* eslint-disable arrow-body-style */
import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import styles from './styles.css';
import Users from '../Users';

const isLoggedIn = () => !!store.get('loggedIn'); // eslint-disable-line no-unused-vars

const Cms = () => {
  return (
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
};

export default Cms;
