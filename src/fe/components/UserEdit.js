import React from 'react';
import { get, patch } from 'axios';
import { Helmet } from 'react-helmet';
import UserForm from './UserForm';
import Page from './Page';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { name: '' } };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    get('/api/users/1')
      .then(({ data: user }) => {
        this.setState({ user });
      });
  }

  handleSubmit(user) {
    patch(`/api/users/${user.id}`, user)
      .then(() => {
        this.setState({ user });

        console.log('updated:', user);
      });
  }

  handleCancel(e) {
    e.preventDefault();

    console.log('you have canceled');
  }

  render() {
    const { user } = this.state;

    return (
      <Page title="Edit User" columns={3}>
        <Helmet>
          <title>CMS | Edit {user.name}</title>
        </Helmet>

        <UserForm
          user={user}
          submitText="Update"
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </Page>
    );
  }
}

export default UserEdit;
