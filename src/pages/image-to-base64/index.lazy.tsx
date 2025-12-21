import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export const Route = createLazyFileRoute('/image-to-base64/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [rawBase64, setRawBase64] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setDataUrl(null);
    setRawBase64(null);
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(f);
  };

  const handleConvert = () => {
    setError(null);
    setDataUrl(null);
    setRawBase64(null);
    if (!file) {
      setError('No file selected');
      return;
    }
    if (!file.type || !file.type.startsWith('image/')) {
      setError('Selected file is not an image');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string | null;
      if (!result) {
        setError('Failed to read file');
        return;
      }
      // result is a data URL like data:image/png;base64,....
      setDataUrl(result);
      const parts = result.split(',');
      if (parts.length > 1) setRawBase64(parts[1]);
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsDataURL(file);
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
          <h1 className='text-center'>Image → Base64</h1>
        </Col>
      </Row>

      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Upload Image</Card.Title>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='mb-2'
              />
              <div className='text-muted small mb-3'>
                Select an image (PNG, JPEG, GIF, WebP, etc.). The file will be converted to a base64
                data URL.
              </div>

              {error && <Alert variant='danger'>{error}</Alert>}

              <Button onClick={handleConvert} className='w-100' disabled={!file}>
                Convert to Base64
              </Button>

              {dataUrl && (
                <div className='mt-5' style={{ textAlign: 'center' }}>
                  <img
                    src={dataUrl}
                    alt='Preview'
                    className='img-fluid'
                    style={{ maxHeight: '20vh' }}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Result</Card.Title>
              {!dataUrl && !error && (
                <div className='text-muted'>No result yet. Upload an image and click Convert.</div>
              )}
              {dataUrl && (
                <>
                  <Form.Group className='mb-2'>
                    <Form.Label>Data URL</Form.Label>
                    <Form.Control as='textarea' rows={8} value={dataUrl} readOnly />
                  </Form.Group>

                  <Form.Group className='mb-2'>
                    <Form.Label>Raw Base64</Form.Label>
                    <Form.Control as='textarea' rows={6} value={rawBase64 || ''} readOnly />
                  </Form.Group>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
