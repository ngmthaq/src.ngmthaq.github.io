import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/timestamp-to-date/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [timestamp, setTimestamp] = useState('');
  const [unit, setUnit] = useState('seconds');
  const [timezone, setTimezone] = useState('UTC');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const convertTimestamp = () => {
    setError('');
    setResult('');
    const num = parseFloat(timestamp);
    if (isNaN(num)) {
      setError('Invalid timestamp');
      return;
    }
    let date: Date;
    if (unit === 'seconds') {
      date = new Date(num * 1000);
    } else {
      date = new Date(num);
    }
    if (isNaN(date.getTime())) {
      setError('Invalid date');
      return;
    }
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    };
    setResult(date.toLocaleString('en-US', options));
  };

  return (
    <ToolPageLayout title='Timestamp to Date' icon='bi-clock'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Input
              </Card.Title>
              <Form.Group className='mb-3'>
                <Form.Label>Timestamp</Form.Label>
                <Form.Control
                  type='text'
                  value={timestamp}
                  onChange={e => setTimestamp(e.target.value)}
                  placeholder='Enter timestamp...'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Unit</Form.Label>
                <Form.Select value={unit} onChange={e => setUnit(e.target.value)}>
                  <option value='seconds'>Seconds</option>
                  <option value='milliseconds'>Milliseconds</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Timezone</Form.Label>
                <Form.Select value={timezone} onChange={e => setTimezone(e.target.value)}>
                  <option value='UTC'>UTC</option>
                  <option value='America/New_York'>Eastern Time</option>
                  <option value='America/Los_Angeles'>Pacific Time</option>
                  <option value='Europe/London'>London</option>
                  <option value='Asia/Tokyo'>Tokyo</option>
                </Form.Select>
              </Form.Group>
              <Button className='w-100' onClick={convertTimestamp}>
                Convert
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-calendar-check text-primary' /> Result
              </Card.Title>
              {error && <Alert variant='danger'>{error}</Alert>}
              {result && (
                <Alert variant='success'>
                  <strong>Date:</strong> {result}
                </Alert>
              )}
              {!error && !result && (
                <p className='text-muted'>The converted date will appear here.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
