import React from 'react';
import { Grid, Form, Header, Message } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import store from 'store';
import { Redirect } from 'react-router-dom';
import isLoggedIn from '../../helpers/is_logged_in';
import styles from './styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    this.setState({ error: false });

    if (!(username === 'george' && password === 'foreman')) {
      return this.setState({ error: true });
    }

    store.set('loggedIn', true);
    history.push('/users');
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.state;

    if (isLoggedIn()) {
      return <Redirect to="/users" />;
    }

    return (
      <Grid>
        <Helmet>
          <title>CMS | Login</title>
        </Helmet>

        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form className={styles.loginForm} error={error} onSubmit={this.onSubmit}>
            <Header as="h1">Login</Header>
            {error && <Message
              error={error}
              content="That username/password is incorrect. Try again!"
            />}
            <Form.Input
              inline
              label="Username"
              name="username"
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Form.Button type="submit">Go!</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
