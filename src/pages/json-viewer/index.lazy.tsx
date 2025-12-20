import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import ReactJson from 'react-json-view';

export const Route = createLazyFileRoute('/json-viewer/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<object | null>(null);
  const [error, setError] = useState('');

  const handleInputChange = (value: string) => {
    setError('');
    setParsed(null);
    try {
      const parsedObj = JSON.parse(value);
      setParsed(parsedObj);
    } catch (e) {
      // show error only if input is non-empty
      if (value.trim()) setError((e as Error).message);
    }
  };

  return (
    <Container fluid='xl' className='py-4'>
      <Row className='mb-3'>
        <Col>
          <Link to='/' className='btn btn-secondary'>
            ← Back to Home
          </Link>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h1 className='text-center'>JSON Viewer</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2} className='mb-3'>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>JSON Input</Card.Title>
              <Form.Control
                as='textarea'
                rows={10}
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  handleInputChange(e.target.value);
                }}
                placeholder='Paste your JSON here...'
                style={{ height: '600px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Output</Card.Title>
              {error && <Alert variant='danger'>{error}</Alert>}
              {parsed && (
                <div style={{ height: 600, overflow: 'auto' }}>
                  <ReactJson
                    src={parsed}
                    name={false}
                    collapsed={1}
                    enableClipboard={true}
                    displayDataTypes={false}
                  />
                </div>
              )}
              {!error && !parsed && <p className='text-muted'>The parsed JSON will appear here.</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
