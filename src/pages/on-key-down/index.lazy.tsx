import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

export const Route = createLazyFileRoute('/on-key-down/')({
  component: RouteComponent,
});

type KeyEventInfo = {
  key: string;
  code: string;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
};

function RouteComponent() {
  const [keyEvent, setKeyEvent] = useState<KeyEventInfo | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeyEvent({
      key: e.key,
      code: e.code,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
    });
  };

  return (
    <Container fluid='sm' className='py-4'>
      <Row className='mb-3'>
        <Col>
          <Link to='/' className='btn btn-secondary'>
            ← Back to Home
          </Link>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h1 className='text-center'>On Key Down</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Key Input</Card.Title>
              <Form.Control
                as='textarea'
                rows={8}
                onKeyDown={handleKeyDown}
                placeholder='Type here to see key events...'
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Key Event Info</Card.Title>
              {keyEvent ? (
                <pre style={{ color: '#6c757d', padding: '10px' }}>
                  {JSON.stringify(keyEvent, null, 2)}
                </pre>
              ) : (
                <pre style={{ color: '#6c757d' }}>
                  Press any key in the input box to see event info here.
                </pre>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
