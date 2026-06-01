import { createLazyFileRoute } from '@tanstack/react-router';
import { diffWords } from 'diff';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/text-diff-viewer/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [text1, setText1] = useState('The quick brown fox jumps over the lazy dog.');
  const [text2, setText2] = useState('The quick brown dog jumps over the lazy fox.');
  const [diff, setDiff] = useState<React.ReactNode | string>('');

  const computeDiff = () => {
    const parts = diffWords(text1 || '', text2 || '');
    const nodes = parts.map((part, idx) => {
      const baseStyle: React.CSSProperties = { whiteSpace: 'pre-wrap' };
      if (part.added) {
        return (
          <span key={idx} style={{ ...baseStyle, backgroundColor: '#e6ffed', color: '#05400a' }}>
            {part.value}
          </span>
        );
      }
      if (part.removed) {
        return (
          <span key={idx} style={{ ...baseStyle, backgroundColor: '#ffeef0', color: '#a50e0e' }}>
            {part.value}
          </span>
        );
      }
      return (
        <span key={idx} style={baseStyle}>
          {part.value}
        </span>
      );
    });
    setDiff(nodes.length ? <div>{nodes}</div> : '');
  };

  return (
    <ToolPageLayout title='Text Diff Viewer' icon='bi-file-diff'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2} className='mb-3'>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-file-text text-primary' /> Original Text
              </Card.Title>
              <Form.Control
                as='textarea'
                rows={8}
                value={text1}
                onChange={e => setText1(e.target.value)}
                placeholder='Enter original text...'
                style={{ height: '200px' }}
              />
              <Card className='mt-3 mb-3 border-0 rounded-3'>
                <Card.Body>
                  <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                    <i className='bi bi-file-earmark-diff text-primary' /> Modified Text
                  </Card.Title>
                  <Form.Control
                    as='textarea'
                    rows={8}
                    value={text2}
                    onChange={e => setText2(e.target.value)}
                    placeholder='Enter modified text...'
                    style={{ height: '200px' }}
                  />
                </Card.Body>
              </Card>
              <Button className='w-100' onClick={computeDiff}>
                Compare
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-layout-split text-primary' /> Differences
              </Card.Title>
              <div style={{ height: 550, overflow: 'auto', marginTop: '0.5rem' }}>
                {diff ? (
                  <div className='bg-light rounded-3 p-3'>{diff}</div>
                ) : (
                  <p className='text-muted'>Differences will appear here...</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
