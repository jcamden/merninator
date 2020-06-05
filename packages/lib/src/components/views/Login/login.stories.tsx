import React from 'react';
import { action } from '@storybook/addon-actions';
import { Container, Row, Col } from 'react-bootstrap';
import Login from './Login';

export default {
  title: 'views',
  component: Login,
};

export const googleLogin = () => (
  <Container>
    <Row>
      <Col className="d-flex justify-content-around p-3">
        <Login onClick={action('clicked')} />
      </Col>
    </Row>
  </Container>
);

googleLogin.story = {
  name: 'Login test',
};
