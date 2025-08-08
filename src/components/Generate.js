import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Spinner, Card } from 'react-bootstrap';
import { CloudArrowDownFill } from 'react-bootstrap-icons';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your image.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setImageUrl('');

    // Simulate an API call to the image generation service
    setTimeout(() => {
      try {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        setImageUrl(url);
      } catch (err) {
        setError('Failed to generate image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Increased delay for a smoother loading animation
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${prompt.slice(0, 20).replace(/\s/g, '-') || 'generated-image'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !isLoading) {
        handleGenerate();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prompt, isLoading]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {/* Form Section */}
        <Col lg={5} md={12} className="mb-4 mb-lg-0">
          <Card className="shadow-lg h-100 border-0 rounded-4">
            <Card.Body className="p-5 d-flex flex-column justify-content-between">
              <div>
                <h2 className="text-center text-primary fw-bold mb-3">Generate Your Image 🖼️</h2>
                <p className="text-muted text-center mb-4">
                  Describe the image you want to create and click generate!
                </p>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="e.g., A fantastical treehouse in a neon forest"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    className="form-control-lg rounded-pill"
                  />
                  {error && <Form.Text className="text-danger mt-2">{error}</Form.Text>}
                </Form.Group>
              </div>
              <div className="d-grid mt-4">
                <Button
                  variant="primary"
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="btn-lg rounded-pill shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Crafting...
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Image Display Section */}
        <Col lg={7} md={12} className="text-center">
          {isLoading && (
            <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5 bg-light rounded-4 shadow-sm">
              <Spinner animation="grow" variant="primary" role="status" />
              <p className="mt-3 text-muted">Awaiting your masterpiece...</p>
            </div>
          )}
          
          {imageUrl && !isLoading && (
            <Card className="shadow-lg h-100 border-0 rounded-4 overflow-hidden">
              <Card.Header className="bg-primary text-white text-start d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0 fw-bold">Generated Image</h5>
                <Button variant="light" onClick={handleDownload} className="rounded-pill p-2">
                  <CloudArrowDownFill size={20} />
                </Button>
              </Card.Header>
              <Card.Body className="p-0 d-flex align-items-center justify-content-center">
                <img
                  src={imageUrl}
                  alt="AI Generated"
                  className="img-fluid"
                />
              </Card.Body>
            </Card>
          )}

          {!imageUrl && !isLoading && !error && (
            <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5 bg-light rounded-4 shadow-sm">
              <p className="text-muted">Your generated image will appear here.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
