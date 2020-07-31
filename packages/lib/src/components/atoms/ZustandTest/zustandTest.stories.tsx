import React from 'react';
import { action } from '@storybook/addon-actions';
import { Container, Row, Col } from 'react-bootstrap';
import { ZustandTest } from './ZustandTest';

export default {
  title: 'atoms',
  component: ZustandTest,
};

export const stateTest = () => (
  <Container>
    <Row>
      <Col className="d-flex justify-content-around p-3">
        <ZustandTest onClick={action('clicked')} />
      </Col>
    </Row>
  </Container>
);

stateTest.story = {
  name: 'ZustandTest test',
};
