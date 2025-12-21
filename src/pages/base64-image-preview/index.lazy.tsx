import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export const Route = createLazyFileRoute('/base64-image-preview/')({
  component: RouteComponent,
});

function detectImageMimeFromBase64(b64: string): string | null {
  try {
    const binary = atob(b64);
    if (binary.length >= 4) {
      const c0 = binary.charCodeAt(0);
      const c1 = binary.charCodeAt(1);
      const c2 = binary.charCodeAt(2);
      const c3 = binary.charCodeAt(3);

      // PNG: 89 50 4E 47
      if (c0 === 0x89 && c1 === 0x50 && c2 === 0x4e && c3 === 0x47) return 'image/png';
      // JPEG: FF D8 FF
      if (c0 === 0xff && c1 === 0xd8 && c2 === 0xff) return 'image/jpeg';
      // GIF: 'GIF8'
      if (binary.slice(0, 4) === 'GIF8') return 'image/gif';

      // SVG: decoded text starting with '<svg'
      const text = binary.slice(0, 200);
      if (text.trim().startsWith('<svg') || text.includes('<svg')) return 'image/svg+xml';
    }
  } catch (e) {
    console.error(e);
    return null;
  }
  return null;
}

function normalizeInputToDataUrl(input: string): { dataUrl?: string; error?: string } {
  if (!input || !input.trim()) return { error: 'No input provided' };

  const trimmed = input.trim();

  // If already a data URL
  if (/^data:image\/.+;base64,/.test(trimmed)) {
    // basic validation of base64 segment
    const parts = trimmed.split(',');
    if (parts.length < 2 || parts[1].length === 0) return { error: 'Invalid data URL' };
    try {
      atob(parts[1]);
      return { dataUrl: trimmed };
    } catch (e) {
      console.error(e);
      return { error: 'Data URL contains invalid base64' };
    }
  }

  // Try to treat as raw base64 (no data url)
  // Remove whitespace and newlines
  const candidate = trimmed.replace(/\s+/g, '');
  try {
    const mime = detectImageMimeFromBase64(candidate);
    if (!mime) return { error: 'Input is not a recognized base64 image' };
    return { dataUrl: `data:${mime};base64,${candidate}` };
  } catch (e) {
    console.error(e);
    return { error: 'Invalid base64 input' };
  }
}

function RouteComponent() {
  const [input, setInput] = useState('');
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePreview = () => {
    setError(null);
    setDataUrl(null);
    const res = normalizeInputToDataUrl(input);
    if (res.error) {
      setError(res.error);
    } else if (res.dataUrl) {
      setDataUrl(res.dataUrl);
    } else {
      setError('Unknown error while parsing input');
    }
  };

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
          <h1 className='text-center'>Base64 Image Preview</h1>
        </Col>
      </Row>

      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Input Base64</Card.Title>
              <Form.Group className='mb-3'>
                <Form.Label>Base64 string or data URL</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={12}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder='Paste data:image/png;base64,... or raw base64 here'
                  style={{ minHeight: '300px' }}
                />
              </Form.Group>

              <Button onClick={handlePreview} className='w-100'>
                Preview
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Preview</Card.Title>
              {error && <Alert variant='danger'>{error}</Alert>}
              {!error && !dataUrl && (
                <div className='text-muted'>
                  Paste a base64 image and click Preview to see it here.
                </div>
              )}
              {dataUrl && (
                <div className='mt-5' style={{ textAlign: 'center' }}>
                  <img
                    src={dataUrl}
                    alt='Preview'
                    className='img-fluid'
                    style={{ maxHeight: '60vh' }}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
