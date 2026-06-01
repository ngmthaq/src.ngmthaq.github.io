import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/on-key-down/')({
  component: RouteComponent,
});

type KeyEventInfo = {
  key: string;
  code: string;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
};

function RouteComponent() {
  const [keyEvent, setKeyEvent] = useState<KeyEventInfo | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeyEvent({
      key: e.key,
      code: e.code,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
    });
  };

  return (
    <ToolPageLayout title='On Key Down' icon='bi-keyboard'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-input-cursor text-primary' /> Key Input
              </Card.Title>
              <Form.Control
                as='textarea'
                rows={8}
                onKeyDown={handleKeyDown}
                placeholder='Type here to see key events...'
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-info-circle text-primary' /> Key Event Info
              </Card.Title>
              {keyEvent ? (
                <pre className='code-output'>{JSON.stringify(keyEvent, null, 2)}</pre>
              ) : (
                <pre className='code-output'>
                  Press any key in the input box to see event info here.
                </pre>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
