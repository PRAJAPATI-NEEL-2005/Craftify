import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-lg p-4 border-0 rounded-4">
            <Card.Body>
              <h1 className="text-center text-primary fw-bold mb-4">About Craftify 🎨</h1>
              <p className="text-center text-muted mb-5">
                Craftify is more than just a tool; it's a gateway for your imagination. We believe that
                everyone has a creative vision, and we're here to help you bring it to life with the power
                of artificial intelligence.
              </p>

              <Row className="text-center g-4">
                <Col md={4}>
                  <div className="p-4 bg-light rounded-3 h-100">
                    <h3 className="text-dark">Visionary</h3>
                    <p className="text-muted">
                      Transform your ideas into stunning, high-quality images in seconds.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-4 bg-light rounded-3 h-100">
                    <h3 className="text-dark">Intuitive</h3>
                    <p className="text-muted">
                      Our simple and clean interface makes image generation accessible to everyone.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-4 bg-light rounded-3 h-100">
                    <h3 className="text-dark">Powered by AI</h3>
                    <p className="text-muted">
                      Utilizing Pollinations AI to provide you with unique and creative results.
                    </p>
                  </div>
                </Col>
              </Row>

              <div className="text-center mt-5">
                <p className="lead text-dark">
                  Ready to start creating your masterpiece?
                </p>
                <Link to="/generate">
                  <Button variant="primary" size="lg" className="rounded-pill shadow-sm">
                    Start Generating Now
                  </Button>
                </Link>
              </div>
            </Card.Body>
            <Card.Footer className="bg-light text-center border-0 rounded-bottom-4">
              <p className="text mb-0">Made by Neel</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
