import { createLazyFileRoute, Link } from '@tanstack/react-router';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

export const Route = createLazyFileRoute('/markdown-viewer/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [markdown, setMarkdown] = useState('');

  // Render markdown using @uiw/react-markdown-preview

  return (
    <Container fluid className='py-4'>
      <Row className='mb-3'>
        <Col>
          <Link to='/' className='btn btn-secondary'>
            ← Back to Home
          </Link>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h1 className='text-center'>Markdown Viewer</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2} className='mb-3'>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Markdown Input</Card.Title>
              <Form.Control
                as='textarea'
                rows={15}
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                placeholder='Enter markdown here...'
                style={{ height: '600px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Rendered Output</Card.Title>
              <div
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  height: '600px',
                  overflow: 'auto',
                }}
              >
                {markdown ? (
                  <MarkdownPreview
                    source={markdown}
                    wrapperElement={{
                      'data-color-mode': 'light',
                    }}
                  />
                ) : (
                  <p className='text-muted'>Rendered markdown will appear here...</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
