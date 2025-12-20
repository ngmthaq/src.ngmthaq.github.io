import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const Route = createLazyFileRoute('/regex-library/')({
  component: RouteComponent,
});

function RouteComponent() {
  const patterns = [
    {
      name: 'Email',
      pattern: '/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/',
      description: 'Matches email addresses',
    },
    {
      name: 'URL',
      pattern:
        '/https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/',
      description: 'Matches URLs',
    },
    {
      name: 'Phone Number (US)',
      pattern: '/^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/',
      description: 'Matches US phone numbers',
    },
    { name: 'ZIP Code (US)', pattern: '/^\\d{5}(-\\d{4})?$/', description: 'Matches US ZIP codes' },
    {
      name: 'Credit Card Number',
      pattern: '/^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}$/',
      description: 'Matches credit card numbers (basic)',
    },
    {
      name: 'Date (MM/DD/YYYY)',
      pattern: '/^(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/\\d{4}$/',
      description: 'Matches dates in MM/DD/YYYY format',
    },
    {
      name: 'IP Address',
      pattern:
        '/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/',
      description: 'Matches IPv4 addresses',
    },
    {
      name: 'Hex Color',
      pattern: '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/',
      description: 'Matches hex color codes',
    },
    {
      name: 'Strong Password',
      pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/',
      description: 'Matches strong passwords',
    },
    {
      name: 'Username',
      pattern: '/^[a-zA-Z0-9_-]{3,16}$/',
      description: 'Matches usernames (3-16 chars, alphanumeric, underscore, hyphen)',
    },
  ];

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
          <h1 className='text-center'>Regex Library</h1>
          <p className='text-center'>Common regular expression patterns</p>
        </Col>
      </Row>
      {patterns.map((item, index) => (
        <Row key={index} className='mb-4'>
          <Col>
            <Card className='shadow-sm h-100'>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <p>{item.description}</p>
                <code
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '5px',
                    borderRadius: '3px',
                    display: 'block',
                  }}
                >
                  {item.pattern}
                </code>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
