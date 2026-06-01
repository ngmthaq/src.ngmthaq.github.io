import { createLazyFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { Row, Col, Card, Form, Alert, Button } from 'react-bootstrap';

import { ToolPageLayout } from '../../../components/ToolPageLayout';

export const Route = createLazyFileRoute('/_tools/npm-script/')({
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
    <ToolPageLayout title='NPM Script Generator' icon='bi-box-seam'>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        <Col className='mb-3'>
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-file-code text-primary' /> Package.json Input
              </Card.Title>
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
          <Card className='h-100 shadow-sm border-0 rounded-3'>
            <Card.Body>
              <Card.Title className='d-flex align-items-center gap-2 fw-semibold'>
                <i className='bi bi-terminal text-primary' /> Install Commands
              </Card.Title>
              {parseResult.error && <Alert variant='danger'>{parseResult.error}</Alert>}
              {!parseResult.error && (
                <>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <Form.Label className='mb-0'>NPM (dependencies)</Form.Label>
                      <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={() => navigator.clipboard.writeText(commands.npm || '')}
                      >
                        <i className='bi bi-clipboard' />
                      </Button>
                    </div>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.npm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <Form.Label className='mb-0'>NPM (devDependencies)</Form.Label>
                      <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={() => navigator.clipboard.writeText(commands.devNpm || '')}
                      >
                        <i className='bi bi-clipboard' />
                      </Button>
                    </div>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.devNpm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <Form.Label className='mb-0'>Yarn (dependencies)</Form.Label>
                      <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={() => navigator.clipboard.writeText(commands.yarn || '')}
                      >
                        <i className='bi bi-clipboard' />
                      </Button>
                    </div>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.yarn || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <Form.Label className='mb-0'>Yarn (devDependencies)</Form.Label>
                      <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={() => navigator.clipboard.writeText(commands.devYarn || '')}
                      >
                        <i className='bi bi-clipboard' />
                      </Button>
                    </div>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.devYarn || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <Form.Label className='mb-0'>PNPM (dependencies)</Form.Label>
                      <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={() => navigator.clipboard.writeText(commands.pnpm || '')}
                      >
                        <i className='bi bi-clipboard' />
                      </Button>
                    </div>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={commands.pnpm || ''}
                      readOnly
                      className='font-monospace'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center mb-1'>
                      <Form.Label className='mb-0'>PNPM (devDependencies)</Form.Label>
                      <Button
                        size='sm'
                        variant='outline-secondary'
                        onClick={() => navigator.clipboard.writeText(commands.devPnpm || '')}
                      >
                        <i className='bi bi-clipboard' />
                      </Button>
                    </div>
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
    </ToolPageLayout>
  );
}
