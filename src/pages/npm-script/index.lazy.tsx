import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';

export const Route = createLazyFileRoute('/npm-script/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [packageJson, setPackageJson] = useState('');

  const parseResult = useMemo(() => {
    if (!packageJson.trim()) {
      return {
        commands: {
          npm: '',
          devNpm: '',
          yarn: '',
          devYarn: '',
          pnpm: '',
          devPnpm: '',
        },
        error: '',
      };
    }

    try {
      const parsed = JSON.parse(packageJson);

      const dependencies = parsed.dependencies
        ? Object.entries(parsed.dependencies).map(([name, version]) => `${name}@${version}`)
        : [];

      const devDependencies = parsed.devDependencies
        ? Object.entries(parsed.devDependencies).map(([name, version]) => `${name}@${version}`)
        : [];

      const npmCommand =
        dependencies.length > 0
          ? `npm install ${dependencies.join(' ')}`
          : '# No dependencies found';

      const devNpmCommand =
        devDependencies.length > 0
          ? `npm install --save-dev ${devDependencies.join(' ')}`
          : '# No devDependencies found';

      const yarnCommand =
        dependencies.length > 0 ? `yarn add ${dependencies.join(' ')}` : '# No dependencies found';

      const devYarnCommand =
        devDependencies.length > 0
          ? `yarn add --dev ${devDependencies.join(' ')}`
          : '# No devDependencies found';

      const pnpmCommand =
        dependencies.length > 0 ? `pnpm add ${dependencies.join(' ')}` : '# No dependencies found';

      const devPnpmCommand =
        devDependencies.length > 0
          ? `pnpm add -D ${devDependencies.join(' ')}`
          : '# No devDependencies found';

      return {
        commands: {
          npm: npmCommand,
          devNpm: devNpmCommand,
          yarn: yarnCommand,
          devYarn: devYarnCommand,
          pnpm: pnpmCommand,
          devPnpm: devPnpmCommand,
        },
        error: '',
      };
    } catch (e) {
      return {
        commands: {
          npm: '# No dependencies found',
          devNpm: '# No dependencies found',
          yarn: '# No dependencies found',
          devYarn: '# No dependencies found',
          pnpm: '# No dependencies found',
          devPnpm: '# No dependencies found',
        },
        error: `Invalid JSON format: ${(e as Error).message}`,
      };
    }
  }, [packageJson]);

  const commands = parseResult.commands;

  const handlePackageJsonChange = (value: string) => {
    setPackageJson(value);
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
          <h1 className='text-center'>Package Manager Install Commands</h1>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Package.json Input</Card.Title>
              <Form.Control
                as='textarea'
                rows={12}
                value={packageJson}
                onChange={e => handlePackageJsonChange(e.target.value)}
                placeholder='Paste your package.json content here...'
                style={{ minHeight: '650px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm'>
            <Card.Body>
              <Card.Title>Install Commands</Card.Title>
              {parseResult.error && <Alert variant='danger'>{parseResult.error}</Alert>}
              {!parseResult.error && (
                <>
                  <Form.Group className='mb-3'>
                    <Form.Label>NPM (dependencies)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.npm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>NPM (devDependencies)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.devNpm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Yarn (dependencies)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.yarn || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Yarn (devDependencies)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.devYarn || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>PNPM (dependencies)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.pnpm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>PNPM (devDependencies)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.devPnpm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
