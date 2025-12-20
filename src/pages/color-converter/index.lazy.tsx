import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

export const Route = createLazyFileRoute('/color-converter/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s: number;
    const l = (max + min) / 2;
    if (max === min) {
      s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    const rgbVal = hexToRgb(value);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const handleRgbChange = (field: 'r' | 'g' | 'b', value: string) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 255) return;
    const newRgb = { ...rgb, [field]: num };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (field: 'h' | 's' | 'l', value: string) => {
    const num = parseFloat(value);
    let max = 100;
    if (field === 'h') max = 360;
    if (isNaN(num) || num < 0 || num > max) return;
    const newHsl = { ...hsl, [field]: num };
    setHsl(newHsl);
    const rgbVal = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  return (
    <Container fluid='sm' className='py-4'>
      <Row className='mb-3'>
        <Col>
          <Link to='/' className='btn btn-secondary'>
            ← Back to Home
          </Link>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h1 className='text-center'>Color Converter</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>HEX</Card.Title>
              <Form.Control
                type='text'
                value={hex}
                onChange={handleHexChange}
                placeholder='#000000'
              />
              <hr />
              <Card.Title className='mt-3'>RGB</Card.Title>
              <Form.Group className='mb-2'>
                <Form.Label>R</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='255'
                  value={rgb.r}
                  onChange={e => handleRgbChange('r', e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>G</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='255'
                  value={rgb.g}
                  onChange={e => handleRgbChange('g', e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>B</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='255'
                  value={rgb.b}
                  onChange={e => handleRgbChange('b', e.target.value)}
                />
              </Form.Group>
              <hr />
              <Card.Title className='mt-3'>HSL</Card.Title>
              <Form.Group className='mb-2'>
                <Form.Label>H</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='360'
                  value={hsl.h}
                  onChange={e => handleHslChange('h', e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>S (%)</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='100'
                  value={hsl.s}
                  onChange={e => handleHslChange('s', e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>L (%)</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='100'
                  value={hsl.l}
                  onChange={e => handleHslChange('l', e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Color Preview</Card.Title>
              <div
                style={{
                  width: '100%',
                  height: '160px',
                  backgroundColor: hex,
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />
              <div className='mt-3'>
                <p>
                  <strong>HEX:</strong> {hex}
                </p>
                <p>
                  <strong>RGB:</strong> {`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                </p>
                <p>
                  <strong>HSL:</strong> {`${hsl.h}°, ${hsl.s}%, ${hsl.l}%`}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
