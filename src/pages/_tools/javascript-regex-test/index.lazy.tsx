import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/javascript-regex-test/')({
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
    <ToolPageLayout title='JavaScript Regex Test' icon='bi-search'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-regex text-primary' /> Regex Pattern
              </Card.Title>
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
                <pre className='code-output'>
                  /{regex}/
                  {Object.entries(flags)
                    .filter(([, v]) => v)
                    .map(([k]) => k)
                    .join('')}
                </pre>
              ) : (
                <pre className='code-output'>
                  Enter a regex pattern to see the generated regex here.
                </pre>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='shadow-sm mb-3 border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-input-cursor-text text-primary' /> Test String
              </Card.Title>
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
          <Card className='shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-list-check text-primary' /> Results
              </Card.Title>
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
    </ToolPageLayout>
  );
}
