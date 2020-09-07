import React, { ReactElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function HomeContainer(): ReactElement {
  return (
    <Container>
      <Row>
        <Col>
          <div>Hola mundo</div>
        </Col>
      </Row>
    </Container>
  );
}
