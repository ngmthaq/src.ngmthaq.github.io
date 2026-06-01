import { createLazyFileRoute } from '@tanstack/react-router';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/markdown-viewer/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [markdown, setMarkdown] = useState('');

  // Render markdown using @uiw/react-markdown-preview

  return (
    <ToolPageLayout title='Markdown Viewer' icon='bi-markdown'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2} className='mb-3'>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Markdown Input
              </Card.Title>
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
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-eye text-primary' /> Rendered Output
              </Card.Title>
              <div
                className='bg-light border rounded-3 p-3'
                style={{ height: '600px', overflow: 'auto' }}
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
    </ToolPageLayout>
  );
}
