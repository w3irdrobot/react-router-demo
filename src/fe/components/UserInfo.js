import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    const { user } = this.props;

    console.log('going to edit user', user);
  }

  handleDelete() {
    const { user, handleDelete } = this.props;

    axios.delete(`/api/users/${user.id}`)
      .then(() => {
        handleDelete(user);
        console.log('user deleted');
      });
  }

  render() {
    const { user = {} } = this.props;

    return (
      <Modal open dimmer="blurring" closeIcon>
        <Modal.Header>{user.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="small" src={`https://api.adorable.io/avatars/250/${user.email}`} />
          <Modal.Description>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>City: {user.city}</p>
            <p>Zip: {user.zip}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={this.handleEdit}>Edit</Button>
          <Button negative onClick={this.handleDelete}>Delete</Button>
          <Button>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default UserInfo;
