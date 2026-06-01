import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/meta-generator/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [favicon, setFavicon] = useState('');
  const [siteName, setSiteName] = useState('');
  const [generatedMeta, setGeneratedMeta] = useState('');

  const handleGenerate = () => {
    const metaTags = [
      `<title>${title}</title>`,
      `<link rel="icon" href="${favicon}" />`,
      `<meta charset="UTF-8" />`,
      `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    ];

    if (title) {
      metaTags.push(`<meta property="og:title" content="${title}" />`);
      metaTags.push(`<meta name="twitter:title" content="${title}" />`);
    }
    if (description) {
      metaTags.push(`<meta property="og:description" content="${description}" />`);
      metaTags.push(`<meta name="twitter:description" content="${description}" />`);
      metaTags.push(`<meta name="description" content="${description}" />`);
    }
    if (url) {
      metaTags.push(`<meta property="og:url" content="${url}" />`);
    }
    if (image) {
      metaTags.push(`<meta property="og:image" content="${image}" />`);
      metaTags.push(`<meta name="twitter:image" content="${image}" />`);
    }
    if (siteName) {
      metaTags.push(`<meta property="og:site_name" content="${siteName}" />`);
    }
    metaTags.push(`<meta property="og:type" content="website" />`);
    metaTags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    setGeneratedMeta(metaTags.join('\n'));
  };

  return (
    <ToolPageLayout title='Meta Generator' icon='bi-tags'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='shadow-sm h-100 border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-info-circle text-primary' /> Meta Information
              </Card.Title>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>URL</Form.Label>
                <Form.Control type='url' value={url} onChange={e => setUrl(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Image URL</Form.Label>
                <Form.Control type='url' value={image} onChange={e => setImage(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Favicon URL</Form.Label>
                <Form.Control
                  type='url'
                  value={favicon}
                  onChange={e => setFavicon(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type='text'
                  value={siteName}
                  onChange={e => setSiteName(e.target.value)}
                />
              </Form.Group>
              <Button className='w-100' onClick={handleGenerate}>
                Generate Meta Tags
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='shadow-sm h-100 border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-code-slash text-primary' /> Generated Meta Tags
              </Card.Title>
              <div className='d-flex justify-content-between align-items-center mb-1'>
                <Form.Label className='mb-0'>Generated Meta Tags</Form.Label>
                <Button
                  size='sm'
                  variant='outline-secondary'
                  onClick={() => navigator.clipboard.writeText(generatedMeta)}
                >
                  <i className='bi bi-clipboard' />
                </Button>
              </div>
              <Form.Control
                as='textarea'
                rows={15}
                value={generatedMeta}
                readOnly
                placeholder='Generated meta tags will appear here...'
                style={{ minHeight: '600px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
