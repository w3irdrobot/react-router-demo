/* eslint-disable arrow-body-style */
import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import { Route, Link, Switch } from 'react-router-dom';
import styles from './styles.css';
import Users from '../Users';
import UserAdd from '../UserAdd';
import UserEdit from '../UserEdit';
import FourOhFour from '../FourOhFour';

const handleLogout = () => () => {
  store.remove('loggedIn');
  console.log('you have been logged out. boo!');
};

const Cms = () => {
  return (
    <div>
      <Helmet>
        <title>CMS</title>
      </Helmet>

      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        <Link to="/users">
          <Menu.Item name="users">
            <Icon name="users" />
            Users
          </Menu.Item>
        </Link>
        <Menu.Item name="logout" onClick={handleLogout()}>
          <Icon name="power" />
          Logout
        </Menu.Item>
      </Sidebar>
      <div className={styles.mainBody}>
        <Switch>
          <Route path="/users/:userId/edit" component={UserEdit} />
          <Route path="/users/new" component={UserAdd} />
          <Route path="/users" component={Users} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </div>
  );
};

export default Cms;
