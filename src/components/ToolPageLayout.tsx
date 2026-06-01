import { Link } from '@tanstack/react-router';
import { Container, Row, Col } from 'react-bootstrap';

type ToolPageLayoutProps = {
  title: string;
  icon: string;
  fluid?: true | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children: React.ReactNode;
};

export function ToolPageLayout({ title, icon, fluid = 'xl', children }: ToolPageLayoutProps) {
  return (
    <Container fluid={fluid} className='py-4'>
      <Row className='mb-3'>
        <Col>
          <Link to='/' className='btn btn-outline-secondary btn-sm'>
            <i className='bi bi-arrow-left me-1' />
            Back to Home
          </Link>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col className='text-center'>
          <i className={`bi ${icon} display-5 text-primary mb-2 d-block`} />
          <h1 className='fw-bold'>{title}</h1>
        </Col>
      </Row>
      {children}
    </Container>
  );
}
