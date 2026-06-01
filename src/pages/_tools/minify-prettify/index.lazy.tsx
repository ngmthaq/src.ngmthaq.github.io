import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';
import { copyToClipboard } from '../../../helpers/copy';

export const Route = createLazyFileRoute('/_tools/minify-prettify/')({
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
    <ToolPageLayout title='Minify / Prettify' icon='bi-code-slash'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Input
              </Card.Title>
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
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-braces text-primary' /> Output
              </Card.Title>
              {error && <Alert variant='danger'>{error}</Alert>}
              <div className='d-flex justify-content-between align-items-center mb-1'>
                <Form.Label className='mb-0'>Output</Form.Label>
                <Button
                  size='sm'
                  variant='outline-secondary'
                  onClick={() => copyToClipboard(output)}
                >
                  <i className='bi bi-clipboard' />
                </Button>
              </div>
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
    </ToolPageLayout>
  );
}
