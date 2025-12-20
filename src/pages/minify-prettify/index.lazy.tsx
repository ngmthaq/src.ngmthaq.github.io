import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export const Route = createLazyFileRoute('/minify-prettify/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [type, setType] = useState('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleMinify = () => {
    setError('');
    if (type === 'json') {
      try {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
      } catch (e) {
        setError((e as Error).message);
      }
    } else {
      // Basic minify: remove extra spaces and newlines
      setOutput(input.replace(/\s+/g, ' ').trim());
    }
  };

  const handlePrettify = () => {
    setError('');
    if (type === 'json') {
      try {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } catch (e) {
        setError((e as Error).message);
      }
    } else {
      // Basic prettify: add newlines
      setOutput(input.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}'));
    }
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
          <h1 className='text-center'>Minify / Prettify</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Input</Card.Title>
              <Form.Group className='mb-3'>
                <Form.Label>Type</Form.Label>
                <Form.Select value={type} onChange={e => setType(e.target.value)}>
                  <option value='json'>JSON</option>
                  <option value='js'>JavaScript</option>
                  <option value='html'>HTML</option>
                </Form.Select>
              </Form.Group>
              <Form.Control
                as='textarea'
                rows={10}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='Paste your code here...'
                style={{ minHeight: '300px' }}
              />
              <div className='mt-3 d-flex gap-2'>
                <Button onClick={handleMinify} className='flex-fill'>
                  Minify
                </Button>
                <Button onClick={handlePrettify} className='flex-fill'>
                  Prettify
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Output</Card.Title>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form.Control
                as='textarea'
                rows={10}
                value={output}
                readOnly
                placeholder='Output will appear here...'
                style={{ height: '450px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
