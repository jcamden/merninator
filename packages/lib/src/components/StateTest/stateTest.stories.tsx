import React from 'react';
import { action } from '@storybook/addon-actions';
import { Container, Row, Col } from 'react-bootstrap';
import StateTest from './StateTest';

export default {
  title: 'Button',
  component: StateTest,
};

export const stateTest = () => (
  <Container>
    <Row>
      <Col className="d-flex justify-content-around p-3">
        <StateTest onClick={action('clicked')} />
      </Col>
    </Row>
  </Container>
);

stateTest.story = {
  name: 'StateTest test',
};
