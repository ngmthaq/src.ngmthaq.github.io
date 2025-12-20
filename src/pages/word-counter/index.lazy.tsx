import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

export const Route = createLazyFileRoute('/word-counter/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const lineCount = text.split('\n').length;
  const paragraphCount = text.split(/\n\s*\n/).filter(p => p.trim()).length;

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
          <h1 className='text-center'>Word Counter</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Text Input</Card.Title>
              <Form.Control
                as='textarea'
                rows={12}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder='Enter your text here...'
                style={{ minHeight: '300px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Statistics</Card.Title>
              <div className='table-responsive mb-3'>
                <table className='table table-sm mb-0'>
                  <tbody>
                    <tr>
                      <th scope='row'>Words</th>
                      <td>{wordCount}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Characters (with spaces)</th>
                      <td>{charCount}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Characters (no spaces)</th>
                      <td>{charCountNoSpaces}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Lines</th>
                      <td>{lineCount}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Paragraphs</th>
                      <td>{paragraphCount}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Estimated reading time</th>
                      <td>{Math.ceil(wordCount / 200)} minutes (at 200 words/min)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
