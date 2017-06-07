import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';

const UserInfo = ({ user = {} }) => (
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
      <Button positive>Edit</Button>
      <Button>Close</Button>
    </Modal.Actions>
  </Modal>
);

export default UserInfo;
