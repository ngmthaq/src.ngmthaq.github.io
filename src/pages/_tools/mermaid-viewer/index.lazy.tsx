import { createLazyFileRoute } from '@tanstack/react-router';
import MarkdownPreview from '@uiw/react-markdown-preview';
import mermaid from 'mermaid';
import { useState, useRef, useEffect, Fragment } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { getCodeString } from 'rehype-rewrite';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/mermaid-viewer/')({
  component: RouteComponent,
});

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code(props: any) {
  const { children, className = '' } = props;
  const [demoid] = useState(() => `dome${randomid()}`);
  const container = useRef<HTMLElement | null>(null);
  const isMermaid = className && /^language-mermaid/.test(String(className).toLowerCase());
  let code = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (props.node && (props.node as any).children) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code = getCodeString((props.node as any).children);
  } else {
    code = (Array.isArray(children) ? children[0] : children) || '';
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      if (container.current && isMermaid) {
        try {
          const str = await mermaid.render(demoid, code);
          if (container.current) container.current.innerHTML = str.svg;
        } catch (error) {
          if (container.current) container.current.innerHTML = String(error);
        }
      }
    })();
    return () => {
      mounted = false;
    };
    // intentionally depend on these
  }, [container, isMermaid, code, demoid]);

  if (isMermaid) {
    return (
      <Fragment>
        <code id={demoid} style={{ display: 'none' }} />
        <code ref={container} data-name='mermaid' />
      </Fragment>
    );
  }
  return <code>{children}</code>;
}

const sample = `The following are some examples of diagrams that can be made using Mermaid.

\n\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\n\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`;

function RouteComponent() {
  const [markdown, setMarkdown] = useState(sample);

  return (
    <ToolPageLayout title='Mermaid Viewer' icon='bi-diagram-3'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2} className='mb-3'>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-pencil text-primary' /> Markdown / Mermaid Input
              </Card.Title>
              <Form.Control
                as='textarea'
                rows={15}
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                placeholder='Enter markdown with ```mermaid code blocks...'
                style={{ height: '600px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-eye text-primary' /> Rendered Output
              </Card.Title>
              <div
                className='bg-light border rounded-3 p-3'
                style={{ height: '600px', overflow: 'auto' }}
              >
                {markdown ? (
                  <MarkdownPreview
                    source={markdown}
                    components={{ code: Code }}
                    wrapperElement={{
                      'data-color-mode': 'light',
                    }}
                  />
                ) : (
                  <p className='text-muted'>Rendered markdown will appear here...</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
