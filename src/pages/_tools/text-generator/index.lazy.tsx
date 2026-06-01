import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';
import { copyToClipboard } from '../../../helpers/copy';

export const Route = createLazyFileRoute('/_tools/text-generator/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [type, setType] = useState('lorem');
  const [count, setCount] = useState(1);
  const [unit, setUnit] = useState('paragraphs');
  const [generatedText, setGeneratedText] = useState('');

  const loremWords = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'ut',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'ut',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'dolor',
    'in',
    'reprehenderit',
    'in',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'dolore',
    'eu',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'in',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum',
  ];

  const generateLorem = (numParagraphs: number) => {
    const paragraphs = [];
    for (let i = 0; i < numParagraphs; i++) {
      const sentenceCount = Math.floor(Math.random() * 5) + 3;
      const sentences = [];
      for (let j = 0; j < sentenceCount; j++) {
        const wordCount = Math.floor(Math.random() * 10) + 5;
        const words = [];
        for (let k = 0; k < wordCount; k++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        sentences.push(words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.');
      }
      paragraphs.push(sentences.join(' '));
    }
    return paragraphs.join('\n\n');
  };

  const generateNumbers = (num: number) => {
    return Array.from({ length: num }, (_, i) => (i + 1).toString()).join('\n');
  };

  const handleGenerate = () => {
    let text = '';
    if (type === 'lorem') {
      if (unit === 'paragraphs') {
        text = generateLorem(count);
      } else if (unit === 'words') {
        text = loremWords.slice(0, count).join(' ');
      } else if (unit === 'sentences') {
        const sentences = [];
        for (let i = 0; i < count; i++) {
          const wordCount = Math.floor(Math.random() * 10) + 5;
          const words = loremWords.slice(0, wordCount);
          sentences.push(words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.');
        }
        text = sentences.join(' ');
      }
    } else if (type === 'numbers') {
      text = generateNumbers(count);
    }
    setGeneratedText(text);
  };

  return (
    <ToolPageLayout title='Text Generator' icon='bi-shuffle'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-sliders text-primary' /> Options
              </Card.Title>
              <Form.Group className='mb-3'>
                <Form.Label>Type</Form.Label>
                <Form.Select value={type} onChange={e => setType(e.target.value)}>
                  <option value='lorem'>Lorem Ipsum</option>
                  <option value='numbers'>Numbers</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Count</Form.Label>
                <Form.Control
                  type='number'
                  min='1'
                  value={count}
                  onChange={e => setCount(parseInt(e.target.value) || 1)}
                />
              </Form.Group>
              {type === 'lorem' && (
                <Form.Group className='mb-3'>
                  <Form.Label>Unit</Form.Label>
                  <Form.Select value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value='paragraphs'>Paragraphs</option>
                    <option value='sentences'>Sentences</option>
                    <option value='words'>Words</option>
                  </Form.Select>
                </Form.Group>
              )}
              <Button onClick={handleGenerate} className='w-100'>
                Generate
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-file-text text-primary' /> Generated Text
              </Card.Title>
              <div className='d-flex justify-content-between align-items-center mb-1'>
                <Form.Label className='mb-0'>Generated Text</Form.Label>
                <Button
                  size='sm'
                  variant='outline-secondary'
                  onClick={() => copyToClipboard(generatedText)}
                >
                  <i className='bi bi-clipboard' />
                </Button>
              </div>
              <Form.Control
                as='textarea'
                rows={12}
                value={generatedText}
                readOnly
                placeholder='Generated text will appear here...'
                style={{ minHeight: '300px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </ToolPageLayout>
  );
}
