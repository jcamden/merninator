import React from 'react';
import { action } from '@storybook/addon-actions';
import { Container, Row, Col } from 'react-bootstrap';
import GoogleLogin from './GoogleLogin';

export default {
  title: 'molecules',
  component: GoogleLogin,
};

export const googleLogin = () => (
  <Container>
    <Row>
      <Col className="d-flex justify-content-around p-3">
        <GoogleLogin onClick={action('clicked')} />
      </Col>
    </Row>
  </Container>
);

googleLogin.story = {
  name: 'GoogleLogin test',
};
