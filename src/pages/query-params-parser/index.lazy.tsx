import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

export const Route = createLazyFileRoute('/query-params-parser/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [input, setInput] = useState('');
  const [params, setParams] = useState<[string, string][]>([]);

  const handleParse = () => {
    try {
      const url = new URL(input);
      const searchParams = new URLSearchParams(url.search);
      const paramArray: [string, string][] = [];
      for (const [key, value] of searchParams) {
        paramArray.push([key, value]);
      }
      setParams(paramArray);
    } catch {
      // If not full URL, try as query string
      try {
        const searchParams = new URLSearchParams(input.startsWith('?') ? input : '?' + input);
        const paramArray: [string, string][] = [];
        for (const [key, value] of searchParams) {
          paramArray.push([key, value]);
        }
        setParams(paramArray);
      } catch {
        setParams([]);
      }
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
          <h1 className='text-center'>Query Params Parser</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='shadow-sm h-100'>
            <Card.Body>
              <Card.Title>URL or Query String</Card.Title>
              <Form.Control
                type='text'
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='Enter URL or query string (e.g., ?key=value&foo=bar)'
              />
              <Button className='mt-3 w-100' onClick={handleParse}>
                Parse
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='shadow-sm h-100'>
            <Card.Body>
              <Card.Title>Parsed Parameters</Card.Title>
              {params.length > 0 ? (
                <div style={{ maxHeight: '420px', overflow: 'auto' }}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {params.map(([key, value], index) => (
                        <tr key={index}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className='text-muted'>
                  No parameters parsed yet. Enter a URL or query string and click Parse.
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
