import React from 'react';
import { get, patch } from 'axios';
import { Form } from 'semantic-ui-react';
import Page from './Page';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    get('/api/users/1')
      .then(({ data: user }) => {
        this.setState({ user });
      });
  }

  handleChange(e, { name, value }) {
    const { user } = this.state;

    this.setState({ user: { ...user, [name]: value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.state;

    patch(`/api/users/${user.id}`, user)
      .then(() => {
        console.log('updated!');
      });
  }

  render() {
    const { user: { name, email, phone, address, city, zip } } = this.state;

    return (
      <Page title="Edit User" columns={3}>
        <Form>
          <Form.Input
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Phone"
            type="tel"
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Address"
            type="text"
            name="address"
            value={address}
            onChange={this.handleChange}
          />
          <Form.Input
            label="City"
            type="text"
            name="city"
            value={city}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Zip Code"
            type="text"
            name="zip"
            value={zip}
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Button onClick={this.handleSubmit}>Update</Form.Button>
            <Form.Button>Cancel</Form.Button>
          </Form.Group>
        </Form>
      </Page>
    );
  }
}

export default UserEdit;
