import { faker } from '@faker-js/faker';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const Route = createLazyFileRoute('/mock-data-generator/')({
  component: RouteComponent,
});

type Field = {
  __id: string;
  __parentId?: string;
  key: string;
  type: string; // 'object' or faker method
};

function getFakerMethods(): string[] {
  const methods: string[] = [];
  const traverse = (obj: unknown, path: string[] = [], depth = 0) => {
    if (depth > 2) return; // Limit depth to prevent deep nesting
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        const value = (obj as Record<string, unknown>)[key];
        if (typeof value === 'function' && key !== 'constructor' && !key.startsWith('_')) {
          methods.push(path.concat(key).join('.'));
        } else if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value) &&
          depth < 2
        ) {
          // Only traverse if it's a faker category (has multiple functions)
          const objKeys = Object.keys(value);
          const hasFunctions = objKeys.some(
            k => typeof (value as Record<string, unknown>)[k] === 'function',
          );
          if (hasFunctions && objKeys.length > 1) {
            traverse(value, path.concat(key), depth + 1);
          }
        }
      }
    }
  };
  traverse(faker);
  return methods
    .filter(method => !method.includes('_randomizer.next') && !method.includes('.seed'))
    .sort();
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function RouteComponent() {
  const [schema, setSchema] = useState<Field[]>([]);
  const [generatedJson, setGeneratedJson] = useState('');
  const [numberOfRecords, setNumberOfRecords] = useState(1);
  const fakerMethods = useMemo(() => getFakerMethods(), []);

  const addField = (parentId?: string) => {
    const newId = generateUUID();
    const newField: Field = { __id: newId, __parentId: parentId, key: '', type: '' };
    setSchema(prev => [...prev, newField]);
  };

  const updateField = (id: string, prop: 'key' | 'type', value: string) => {
    setSchema(prev => prev.map(f => (f.__id === id ? { ...f, [prop]: value } : f)));
  };

  const removeField = (id: string) => {
    const toRemove = new Set<string>();
    const collectIds = (currentId: string) => {
      toRemove.add(currentId);
      schema.filter(f => f.__parentId === currentId).forEach(f => collectIds(f.__id));
    };
    collectIds(id);
    setSchema(prev => prev.filter(f => !toRemove.has(f.__id)));
  };

  const renderFields = (parentId?: string) => {
    const fields = schema.filter(f => f.__parentId === parentId);
    return fields.map(field => (
      <Card
        key={field.__id}
        className={`mb-3 ${parentId ? 'ms-3' : ''}`}
        style={{ borderLeft: parentId ? '3px solid #007bff' : undefined }}
      >
        <Card.Body className='px-3 py-2'>
          <div className='d-flex justify-content-end align-items-center'>
            <Button
              className='mb-2'
              variant='outline-danger'
              size='sm'
              onClick={() => removeField(field.__id)}
            >
              <i className='bi bi-trash'></i>
            </Button>
          </div>
          <Row className='mb-2'>
            <Col sm={4}>
              <label className='form-label'>Key:</label>
            </Col>
            <Col sm={8}>
              <input
                className='form-control'
                value={field.key}
                onChange={e => updateField(field.__id, 'key', e.target.value)}
                placeholder='JSON key'
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col sm={4}>
              <label className='form-label'>Data Type:</label>
            </Col>
            <Col sm={8}>
              <input
                className='form-control'
                value={field.type}
                onChange={e => updateField(field.__id, 'type', e.target.value)}
                list='data-types'
                placeholder='Select or type a data type'
                type='search'
              />
              <datalist id='data-types'>
                <option value='object' />
                {fakerMethods.map(m => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </Col>
          </Row>
          <div className='mt-2'>
            {field.type === 'object' && (
              <>
                <Button
                  variant='outline-primary'
                  size='sm'
                  onClick={() => addField(field.__id)}
                  className='me-2'
                >
                  Add Subfield
                </Button>
                <div className='mt-2'>{renderFields(field.__id)}</div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    ));
  };

  const generateJson = () => {
    const generateValue = (type: string): unknown => {
      if (type === 'object') return {};
      const path = type.split('.');
      let fn: unknown = faker;
      for (const p of path) {
        fn = (fn as Record<string, unknown>)[p];
      }
      return (fn as () => unknown)();
    };

    const buildObject = (parentId?: string): Record<string, unknown> => {
      const obj: Record<string, unknown> = {};
      schema
        .filter(f => f.__parentId === parentId)
        .forEach(field => {
          if (field.key) {
            if (field.type === 'object') {
              obj[field.key] = buildObject(field.__id);
            } else {
              obj[field.key] = generateValue(field.type);
            }
          }
        });
      return obj;
    };

    const data = Array.from({ length: numberOfRecords }, () => buildObject());
    setGeneratedJson(JSON.stringify(data, null, 2));
  };

  return (
    <Container fluid='xl' className='py-4'>
      <Row className='mb-3'>
        <Col>
          <Link to='/' className='btn btn-secondary'>
            ← Back to Home
          </Link>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <h1 className='text-center'>Mock Data Generator</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Schema Builder</Card.Title>
              <div>{renderFields()}</div>
              <Row className='mb-3'>
                <Col sm={12}>
                  <label className='form-label'>Number of Records:</label>
                  <input
                    type='number'
                    className='form-control'
                    value={numberOfRecords}
                    onChange={e => setNumberOfRecords(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                  />
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col sm={6}>
                  <Button onClick={() => addField()} className='w-100'>
                    Add Field
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button onClick={generateJson} className='w-100'>
                    Generate JSON
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Generated JSON</Card.Title>
              <pre
                style={{
                  height: '300px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                  fontSize: '0.875rem',
                }}
              >
                {generatedJson || 'Generated JSON will appear here...'}
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
