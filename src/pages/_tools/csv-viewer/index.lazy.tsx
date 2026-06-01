import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/csv-viewer/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [csvText, setCsvText] = useState('');
  const [parsedData, setParsedData] = useState<string[][] | null>(null);

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n');
    if (lines.length === 0) return null;
    const data = lines.map(line => line.split(','));
    return data;
  };

  const handleParse = () => {
    const data = parseCSV(csvText);
    setParsedData(data);
  };

  return (
    <ToolPageLayout title='CSV Viewer' icon='bi-table'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> CSV Input
              </Card.Title>
              <Form.Control
                as='textarea'
                rows={10}
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                placeholder='Paste your CSV data here...'
                style={{ height: '450px' }}
              />
              <Button className='mt-3 w-100' onClick={handleParse}>
                Parse CSV
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-grid text-primary' /> Parsed Data
              </Card.Title>
              {parsedData && parsedData.length > 0 ? (
                <div style={{ maxHeight: 500, overflow: 'auto' }}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        {parsedData[0].map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {parsedData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <p className='text-muted'>Parsed CSV will appear here after parsing.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
