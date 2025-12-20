import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export const Route = createLazyFileRoute('/javascript-regex-test/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState({ g: false, i: false, m: false });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleTest = () => {
    setError('');
    setMatches([]);
    try {
      const flagStr = Object.entries(flags)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join('');
      const re = new RegExp(regex, flagStr);
      const result = testString.match(re);
      if (result) {
        setMatches(result);
      } else {
        setMatches([]);
      }
    } catch (e) {
      setError((e as Error).message);
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
          <h1 className='text-center'>JavaScript Regex Test</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Regex Pattern</Card.Title>
              <Form.Control
                type='text'
                value={regex}
                onChange={e => setRegex(e.target.value)}
                placeholder='Enter regex pattern'
                className='mb-3'
              />
              <Form.Group className='mb-4'>
                <Form.Label>Flags</Form.Label>
                <Form.Check
                  type='checkbox'
                  label='Global (g)'
                  checked={flags.g}
                  onChange={e => setFlags({ ...flags, g: e.target.checked })}
                />
                <Form.Check
                  type='checkbox'
                  label='Case Insensitive (i)'
                  checked={flags.i}
                  onChange={e => setFlags({ ...flags, i: e.target.checked })}
                />
                <Form.Check
                  type='checkbox'
                  label='Multiline (m)'
                  checked={flags.m}
                  onChange={e => setFlags({ ...flags, m: e.target.checked })}
                />
              </Form.Group>
              <h6 className='mb-2'>Generated Regex:</h6>
              {regex ? (
                <pre style={{ backgroundColor: '#f8f9fa' }}>
                  /{regex}/
                  {Object.entries(flags)
                    .filter(([, v]) => v)
                    .map(([k]) => k)
                    .join('')}
                </pre>
              ) : (
                <pre style={{ color: '#6c757d' }}>
                  Enter a regex pattern to see the generated regex here.
                </pre>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='shadow-sm mb-3'>
            <Card.Body>
              <Card.Title>Test String</Card.Title>
              <Form.Control
                as='textarea'
                rows={5}
                value={testString}
                onChange={e => setTestString(e.target.value)}
                placeholder='Enter test string'
              />
              <Button className='mt-3 w-100' onClick={handleTest}>
                Test Regex
              </Button>
            </Card.Body>
          </Card>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title>Results</Card.Title>
              {error && <Alert variant='danger'>{error}</Alert>}
              {matches.length > 0 ? (
                <ul>
                  {matches.map((match, index) => (
                    <li key={index}>{match}</li>
                  ))}
                </ul>
              ) : (
                !error && <p>No matches found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
