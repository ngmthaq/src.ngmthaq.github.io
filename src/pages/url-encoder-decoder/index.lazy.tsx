import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export const Route = createLazyFileRoute('/url-encoder-decoder/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput('Error: Invalid input');
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
          <h1 className='text-center'>URL Encoder/Decoder</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Input</Card.Title>
              <Form.Control
                as='textarea'
                rows={6}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='Enter URL or text...'
              />
              <Form.Group className='mt-3'>
                <Form.Check
                  type='radio'
                  label='Encode'
                  name='mode'
                  value='encode'
                  checked={mode === 'encode'}
                  onChange={e => setMode(e.target.value)}
                />
                <Form.Check
                  type='radio'
                  label='Decode'
                  name='mode'
                  value='decode'
                  checked={mode === 'decode'}
                  onChange={e => setMode(e.target.value)}
                />
              </Form.Group>
              <Button className='mt-3 w-100' onClick={handleProcess}>
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Output</Card.Title>
              <Form.Control
                as='textarea'
                rows={12}
                value={output}
                readOnly
                className='font-monospace'
                placeholder='Result will appear here...'
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
