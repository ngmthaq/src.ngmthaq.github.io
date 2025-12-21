import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import type { FileRouteTypes } from '../router/routeTree.gen';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node | null;
      if (qrRef.current && target && !qrRef.current.contains(target)) {
        setShowQR(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const items: { name: string; path: FileRouteTypes['to']; icon: string }[] = [
    { name: 'My Resume', path: '/resume', icon: '📄' },
    { name: 'Text Generator', path: '/text-generator', icon: '🎲' },
    { name: 'Meta Generator', path: '/meta-generator', icon: '🏷️' },
    { name: 'NPM Script Generator', path: '/npm-script', icon: '📦' },
    { name: 'Word Counter', path: '/word-counter', icon: '📊' },
    { name: 'On Key Down', path: '/on-key-down', icon: '⌨️' },
    { name: 'JavaScript Regex Test', path: '/javascript-regex-test', icon: '🔍' },
    { name: 'Regex Library', path: '/regex-library', icon: '🧩' },
    { name: 'Minify / Prettify Tool', path: '/minify-prettify', icon: '🧽' },
    { name: 'Timestamp to Date', path: '/timestamp-to-date', icon: '🕒' },
    { name: 'String Converter', path: '/string-converter', icon: '🔤' },
    { name: 'JSON Viewer', path: '/json-viewer', icon: '📋' },
    { name: 'Markdown Viewer', path: '/markdown-viewer', icon: '📝' },
    { name: 'Mermaid Viewer', path: '/mermaid-viewer', icon: '📈' },
    { name: 'CSV Viewer', path: '/csv-viewer', icon: '🖥️' },
    { name: 'JWT Decoder', path: '/jwt-decoder', icon: '🔐' },
    { name: 'Text Diff Viewer', path: '/text-diff-viewer', icon: '🔄' },
    { name: 'Color Converter', path: '/color-converter', icon: '🎨' },
    { name: 'Image Converter', path: '/image-converter', icon: '🖼️' },
    { name: 'Image → Base64', path: '/image-to-base64', icon: '🌁' },
    { name: 'Base64 Image Preview', path: '/base64-image-preview', icon: '🌄' },
    { name: 'URL Encoder/Decoder', path: '/url-encoder-decoder', icon: '🔗' },
    { name: 'Query Params Parser', path: '/query-params-parser', icon: '⚓️' },
  ];

  return (
    <>
      <Container fluid='xl' className='py-8'>
        <h1 className='my-4 text-center display-4 fw-bold'>Nguyen Manh Thang</h1>
        <p className='my-4 text-center lead'>
          Welcome back! This is the home page of my application
        </p>
        <Row>
          {items.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className='mb-4'>
              <Card className='h-100 shadow-sm'>
                {item.path === '/resume' ? (
                  <a
                    href={'/#' + item.path}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-decoration-none h-100 d-flex flex-column align-items-center justify-content-center p-4 text-dark'
                  >
                    <div className='mb-2 display-6'>{item.icon}</div>
                    <div className='text-center'>{item.name}</div>
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className='text-decoration-none h-100 d-flex flex-column align-items-center justify-content-center p-4 text-dark'
                  >
                    <div className='mb-2 display-6'>{item.icon}</div>
                    <div className='text-center'>{item.name}</div>
                  </Link>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className='text-center py-3 mt-4'>
        <Container>
          <div className='d-flex flex-column align-items-center'>
            <small className='text-muted mb-2'>
              If you find this project useful, consider supporting me —
            </small>

            <div style={{ position: 'relative', display: 'inline-block' }} ref={qrRef}>
              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => setShowQR(s => !s)}
                aria-expanded={showQR}
                aria-controls='donate-qr'
              >
                Donate
              </button>

              {showQR && (
                <div
                  id='donate-qr'
                  role='dialog'
                  aria-label='Donate QR code'
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: 0,
                    background: 'white',
                    borderRadius: 8,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                    zIndex: 1000,
                    width: 200,
                    height: 'auto',
                  }}
                >
                  <img src='/qr-code.png' alt='Donate QR code' className='img-fluid' />
                </div>
              )}
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
