import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Alert } from 'react-bootstrap';
import ReactJson from 'react-json-view';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/json-viewer/')({
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
    <ToolPageLayout title='JSON Viewer' icon='bi-braces'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2} className='mb-3'>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> JSON Input
              </Card.Title>
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
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-eye text-primary' /> Output
              </Card.Title>
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
    </ToolPageLayout>
  );
}
