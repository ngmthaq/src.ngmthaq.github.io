import { createLazyFileRoute } from '@tanstack/react-router';
import { Row, Col, Card } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/regex-library/')({
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
    <ToolPageLayout title='Regex Library' icon='bi-puzzle'>
      {patterns.map((item, index) => (
        <Row key={index} className='mb-4'>
          <Col>
            <Card className='shadow-sm h-100 border-0 rounded-3'>
              <Card.Body>
                <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                  <i className='bi bi-regex text-primary' /> {item.name}
                </Card.Title>
                <p>{item.description}</p>
                <code className='bg-dark text-light rounded-2 p-3 font-monospace small d-block'>
                  {item.pattern}
                </code>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </ToolPageLayout>
  );
}
