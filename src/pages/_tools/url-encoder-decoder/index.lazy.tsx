import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/url-encoder-decoder/')({
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
    <ToolPageLayout title='URL Encoder / Decoder' icon='bi-link-45deg'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Input
              </Card.Title>
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
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-terminal text-primary' /> Output
              </Card.Title>
              <div className='d-flex justify-content-between align-items-center mb-1'>
                <Form.Label className='mb-0'>Result</Form.Label>
                <Button
                  size='sm'
                  variant='outline-secondary'
                  onClick={() => navigator.clipboard.writeText(output)}
                >
                  <i className='bi bi-clipboard' />
                </Button>
              </div>
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
    </ToolPageLayout>
  );
}
