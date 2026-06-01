import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';
import { copyToClipboard } from '../../../helpers/copy';

export const Route = createLazyFileRoute('/_tools/md5/')({
  component: RouteComponent,
});

function toUtf8Bytes(str: string) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function md5(input: string): string {
  // Minimal JS MD5 implementation adapted for browser/TS usage
  const bytes = toUtf8Bytes(input);

  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) >>> 0;
  }

  function leftRotate(x: number, c: number) {
    return (x << c) | (x >>> (32 - c));
  }

  // Initialize variables
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  // Pre-processing: padding the message
  const originalBitLen = bytes.length * 8;
  const withOne = new Uint8Array(bytes.length + 1);
  withOne.set(bytes);
  withOne[bytes.length] = 0x80;

  // Calculate new length (in bytes) so that length % 64 == 56
  let paddedLen = withOne.length;
  while (paddedLen % 64 !== 56) paddedLen++;
  const padded = new Uint8Array(paddedLen + 8);
  padded.set(withOne);

  // Append original length in little-endian
  for (let i = 0; i < 8; i++) {
    padded[paddedLen + i] = (originalBitLen >>> (8 * i)) & 0xff;
  }

  // Process the message in successive 512-bit (64-byte) chunks
  const M = new Uint32Array(16);
  for (let i = 0; i < padded.length; i += 64) {
    // break chunk into sixteen 32-bit little-endian words
    for (let j = 0; j < 16; j++) {
      const off = i + j * 4;
      M[j] =
        padded[off] | (padded[off + 1] << 8) | (padded[off + 2] << 16) | (padded[off + 3] << 24);
    }

    let A = a0,
      B = b0,
      C = c0,
      D = d0;

    for (let iRound = 0; iRound < 64; iRound++) {
      let F: number, g: number;
      if (iRound < 16) {
        F = (B & C) | (~B & D);
        g = iRound;
      } else if (iRound < 32) {
        F = (D & B) | (~D & C);
        g = (5 * iRound + 1) % 16;
      } else if (iRound < 48) {
        F = B ^ C ^ D;
        g = (3 * iRound + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * iRound) % 16;
      }

      const s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5,
        9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10,
        15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
      ][iRound];

      const temp = (A + F + K[iRound] + (M[g] >>> 0)) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + leftRotate(temp >>> 0, s)) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  function toHexLE(num: number) {
    let hex = '';
    for (let i = 0; i < 4; i++) {
      const byte = (num >>> (i * 8)) & 0xff;
      hex += (byte < 16 ? '0' : '') + byte.toString(16);
    }
    return hex;
  }

  return toHexLE(a0) + toHexLE(b0) + toHexLE(c0) + toHexLE(d0);
}

function RouteComponent() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCompute = () => {
    setResult(md5(input));
  };

  return (
    <ToolPageLayout title='MD5' icon='bi-lock'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Input
              </Card.Title>
              <Form.Group className='mb-3'>
                <Form.Label>Text to hash</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={8}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleCompute} className='w-100'>
                Compute MD5
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-hash text-primary' /> Result
              </Card.Title>
              <Form.Group>
                <div className='d-flex justify-content-between align-items-center mb-1'>
                  <Form.Label className='mb-0'>MD5 (hex)</Form.Label>
                  <Button
                    size='sm'
                    variant='outline-secondary'
                    onClick={() => copyToClipboard(result ?? '')}
                  >
                    <i className='bi bi-clipboard' />
                  </Button>
                </div>
                <Form.Control readOnly as='textarea' rows={8} value={result ?? ''} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
