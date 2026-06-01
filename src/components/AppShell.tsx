import { Link } from '@tanstack/react-router';
import { useRef, useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

type AppShellProps = { children: React.ReactNode };

export function AppShell({ children }: AppShellProps) {
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (qrRef.current && !qrRef.current.contains(e.target as Node)) {
        setShowQR(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar sticky='top' bg='white' className='border-bottom shadow-sm px-3'>
        <Navbar.Brand as={Link} to='/' className='d-flex align-items-center gap-2 fw-bold'>
          <i className='bi bi-tools text-primary' />
          DevTools by ngmthaq
        </Navbar.Brand>
        <Nav className='ms-auto'>
          <a
            href='/#/resume'
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-outline-primary btn-sm'
          >
            <i className='bi bi-file-person me-1' />
            My Resume
          </a>
        </Nav>
      </Navbar>

      <main className='flex-grow-1'>{children}</main>

      <footer className='border-top py-3 mt-auto'>
        <Container>
          <div className='d-flex flex-column align-items-center gap-2'>
            <small className='text-muted'>
              If you find this project useful, consider supporting me —
            </small>
            <div style={{ position: 'relative', display: 'inline-block' }} ref={qrRef}>
              <button
                type='button'
                className='btn btn-outline-secondary btn-sm'
                onClick={() => setShowQR(s => !s)}
                aria-expanded={showQR}
              >
                <i className='bi bi-qr-code me-1' /> Donate
              </button>
              {showQR && (
                <div
                  role='dialog'
                  aria-label='Donate QR code'
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white',
                    borderRadius: 8,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                    zIndex: 1000,
                    width: 200,
                  }}
                >
                  <img src='/qr-code.png' alt='Donate QR code' className='img-fluid' />
                </div>
              )}
            </div>
            <small className='text-muted'>
              &copy; {new Date().getFullYear()} ngmthaq. All rights reserved.
            </small>
          </div>
        </Container>
      </footer>
    </div>
  );
}
