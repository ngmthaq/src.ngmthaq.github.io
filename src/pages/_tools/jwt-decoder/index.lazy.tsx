import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/jwt-decoder/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const base64UrlDecode = (str: string) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  };

  const handleDecode = () => {
    setError('');
    setHeader('');
    setPayload('');
    setSignature('');
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));
      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <ToolPageLayout title='JWT Decoder' icon='bi-shield-lock'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-key text-primary' /> JWT Token
              </Card.Title>
              <Form.Control
                as='textarea'
                rows={6}
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder='Paste your JWT token here...'
                style={{ minHeight: '500px' }}
              />
              <Button className='mt-3 w-100' onClick={handleDecode}>
                Decode
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-unlock text-primary' /> Decoded
              </Card.Title>
              <div style={{ height: '560px', overflow: 'auto' }}>
                {error && <Alert variant='danger'>{error}</Alert>}
                {!error && (header || payload || signature) ? (
                  <div>
                    <Card className='mb-3 border-0 rounded-3'>
                      <Card.Body>
                        <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                          <i className='bi bi-file-code text-primary' /> Header
                        </Card.Title>
                        <pre className='code-output'>
                          <code>{header}</code>
                        </pre>
                      </Card.Body>
                    </Card>
                    <Card className='mb-3 border-0 rounded-3'>
                      <Card.Body>
                        <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                          <i className='bi bi-file-text text-primary' /> Payload
                        </Card.Title>
                        <pre className='code-output'>
                          <code>{payload}</code>
                        </pre>
                      </Card.Body>
                    </Card>
                    <Card className='border-0 rounded-3'>
                      <Card.Body>
                        <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                          <i className='bi bi-pen text-primary' /> Signature
                        </Card.Title>
                        <p style={{ wordBreak: 'break-all' }}>{signature}</p>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (
                  !error && (
                    <p className='text-muted'>Decoded JWT will appear here after decoding.</p>
                  )
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
