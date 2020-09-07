import React, { ReactElement } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

export default function InventoryContainer(
  props: RouteComponentProps,
): ReactElement {
  const items: { name: String; amount: Number }[] = [
    {
      name: 'item1',
      amount: 1,
    },
    {
      name: 'item2',
      amount: 2,
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <th>Nombre</th>
              <th>Cantidad</th>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr>
                  <td>{i.name}</td>
                  <td>{i.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Añadir</Button>
        </Col>
      </Row>
    </Container>
  );
}
