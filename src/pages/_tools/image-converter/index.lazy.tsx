import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/image-converter/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState<number>(0.5);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConvertedUrl(null);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
          }
        },
        format,
        quality,
      );
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <ToolPageLayout title='Image Converter' icon='bi-image'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-upload text-primary' /> Upload & Options
              </Card.Title>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='mb-2'
              />
              <div className='text-muted small mb-2'>
                Supported input formats: JPEG, PNG, WebP, GIF, BMP, TIFF (browser support may vary)
              </div>

              <Form.Label className='d-block mb-2'>Select Format</Form.Label>
              <Form.Select
                value={format}
                onChange={e => setFormat(e.target.value)}
                className='mb-3'
              >
                <option value='image/jpeg'>JPEG</option>
                <option value='image/png'>PNG</option>
                <option value='image/webp'>WebP</option>
              </Form.Select>

              <Form.Group className='mb-3'>
                <Form.Label>Quality (0 - 1) — used for JPEG/WebP</Form.Label>
                <div className='d-flex align-items-center'>
                  <Form.Range
                    min='0'
                    max='1'
                    step='0.01'
                    value={String(quality)}
                    onChange={e => setQuality(Number((e.target as HTMLInputElement).value))}
                  />
                  <div className='ms-3' style={{ minWidth: 56, textAlign: 'right' }}>
                    {quality.toFixed(2)}
                  </div>
                </div>
              </Form.Group>

              <Button className='mt-2 w-100' onClick={handleConvert} disabled={!file}>
                Convert
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-eye text-primary' /> Preview / Download
              </Card.Title>
              {convertedUrl ? (
                <>
                  <img src={convertedUrl} alt='Converted' className='img-fluid mb-3' />
                  <a
                    href={convertedUrl}
                    download={`converted.${format.split('/')[1]}`}
                    className='btn btn-primary w-100'
                  >
                    Download
                  </a>
                </>
              ) : (
                <div className='text-muted'>
                  No converted image yet. Upload and convert an image.
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
