import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { AppShell } from '../components/AppShell';
import type { FileRouteTypes } from '../router/routeTree.gen';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const items: { name: string; path: FileRouteTypes['to']; icon: string }[] = [
    { name: 'My Resume', path: '/resume', icon: 'bi-file-person' },
    { name: 'Text Generator', path: '/text-generator', icon: 'bi-shuffle' },
    { name: 'Mock Data Generator', path: '/mock-data-generator', icon: 'bi-database-fill-gear' },
    { name: 'Meta Generator', path: '/meta-generator', icon: 'bi-tags' },
    { name: 'NPM Script Generator', path: '/npm-script', icon: 'bi-box-seam' },
    { name: 'Word Counter', path: '/word-counter', icon: 'bi-bar-chart-line' },
    { name: 'On Key Down', path: '/on-key-down', icon: 'bi-keyboard' },
    { name: 'JavaScript Regex Test', path: '/javascript-regex-test', icon: 'bi-search' },
    { name: 'Regex Library', path: '/regex-library', icon: 'bi-puzzle' },
    { name: 'Minify / Prettify Tool', path: '/minify-prettify', icon: 'bi-code-slash' },
    { name: 'Timestamp to Date', path: '/timestamp-to-date', icon: 'bi-clock' },
    { name: 'String Converter', path: '/string-converter', icon: 'bi-fonts' },
    { name: 'JSON Viewer', path: '/json-viewer', icon: 'bi-braces' },
    { name: 'Markdown Viewer', path: '/markdown-viewer', icon: 'bi-markdown' },
    { name: 'Mermaid Viewer', path: '/mermaid-viewer', icon: 'bi-diagram-3' },
    { name: 'CSV Viewer', path: '/csv-viewer', icon: 'bi-table' },
    { name: 'JWT Decoder', path: '/jwt-decoder', icon: 'bi-shield-lock' },
    { name: 'MD5', path: '/md5', icon: 'bi-lock' },
    { name: 'Text Diff Viewer', path: '/text-diff-viewer', icon: 'bi-file-diff' },
    { name: 'Color Converter', path: '/color-converter', icon: 'bi-palette' },
    { name: 'Image Converter', path: '/image-converter', icon: 'bi-image' },
    { name: 'Image → Base64', path: '/image-to-base64', icon: 'bi-image-fill' },
    { name: 'Base64 Image Preview', path: '/base64-image-preview', icon: 'bi-eye' },
    { name: 'URL Encoder/Decoder', path: '/url-encoder-decoder', icon: 'bi-link-45deg' },
    { name: 'Query Params Parser', path: '/query-params-parser', icon: 'bi-question-circle' },
  ];

  return (
    <AppShell>
      <Container fluid='xl' className='py-5'>
        <div className='hero-gradient rounded-3 text-center py-5 px-3 mb-5'>
          <h1 className='display-4 fw-bold mb-2'>DevTools by ngmthaq</h1>
          <p className='lead text-muted mb-0'>
            25+ free developer utilities — no signup, no tracking, runs entirely in your browser.
          </p>
        </div>

        <Row>
          {items.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
              <Card className='tool-card h-100 shadow-sm border-0 rounded-3'>
                {item.path === '/resume' ? (
                  <a
                    href={'/#' + item.path}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-decoration-none h-100 d-flex flex-column align-items-center justify-content-center p-4 text-dark'
                  >
                    <i className={`bi ${item.icon} fs-1 text-primary mb-3`} />
                    <span className='text-center fw-medium'>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className='text-decoration-none h-100 d-flex flex-column align-items-center justify-content-center p-4 text-dark'
                  >
                    <i className={`bi ${item.icon} fs-1 text-primary mb-3`} />
                    <span className='text-center fw-medium'>{item.name}</span>
                  </Link>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </AppShell>
  );
}
