import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';
import { copyToClipboard } from '../../../helpers/copy';

export const Route = createLazyFileRoute('/_tools/string-converter/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversion, setConversion] = useState('uppercase');

  const convert = () => {
    switch (conversion) {
      case 'uppercase':
        setOutput(input.toUpperCase());
        break;
      case 'lowercase':
        setOutput(input.toLowerCase());
        break;
      case 'titlecase':
        setOutput(
          input.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
        );
        break;
      case 'camelcase':
        setOutput(
          input
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
              index === 0 ? word.toLowerCase() : word.toUpperCase(),
            )
            .replace(/\s+/g, ''),
        );
        break;
      case 'snakecase':
        setOutput(
          input
            .replace(/\W+/g, ' ')
            .split(/ |\B(?=[A-Z])/)
            .map(word => word.toLowerCase())
            .join('_'),
        );
        break;
      case 'reverse':
        setOutput(input.split('').reverse().join(''));
        break;
      default:
        setOutput(input);
    }
  };

  return (
    <ToolPageLayout title='String Converter' icon='bi-fonts'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Input
              </Card.Title>
              <Form.Control
                as='textarea'
                rows={6}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder='Enter text to convert...'
                style={{ minHeight: '250px' }}
              />
              <Form.Group className='mt-3'>
                <Form.Label>Conversion Type</Form.Label>
                <Form.Select value={conversion} onChange={e => setConversion(e.target.value)}>
                  <option value='uppercase'>Uppercase</option>
                  <option value='lowercase'>Lowercase</option>
                  <option value='titlecase'>Title Case</option>
                  <option value='camelcase'>Camel Case</option>
                  <option value='snakecase'>Snake Case</option>
                  <option value='reverse'>Reverse</option>
                </Form.Select>
              </Form.Group>
              <Button className='mt-3 w-100' onClick={convert}>
                Convert
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-type text-primary' /> Output
              </Card.Title>
              <div className='d-flex justify-content-between align-items-center mb-1'>
                <Form.Label className='mb-0'>Output</Form.Label>
                <Button
                  size='sm'
                  variant='outline-secondary'
                  onClick={() => copyToClipboard(output)}
                >
                  <i className='bi bi-clipboard' />
                </Button>
              </div>
              <Form.Control
                as='textarea'
                rows={6}
                value={output}
                readOnly
                placeholder='Converted text will appear here...'
                style={{ minHeight: '380px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
