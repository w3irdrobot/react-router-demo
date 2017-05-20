import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const Page = ({ children, title }) =>
  <div>
    <Grid columns={1} padded>
      <Grid.Column>
        <Header as='h1'>{title}</Header>
        {children}
      </Grid.Column>
    </Grid>
  </div>;

export default Page;
