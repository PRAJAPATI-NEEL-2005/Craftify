import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Spinner, Card } from 'react-bootstrap';
import { CloudArrowDownFill, ShareFill } from 'react-bootstrap-icons';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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
    }, 1500);
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${prompt.slice(0, 20).replace(/\s/g, '-') || 'generated-image'}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Could not download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Craftify AI Image',
          text: `Check out this AI-generated image I made with the prompt: "${prompt}"`,
          url: imageUrl,
        });
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Your browser does not support the Web Share API. Please try downloading the image instead.');
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
                <div>
                  <Button variant="light" onClick={handleShare} className="rounded-pill p-2 me-2">
                    <ShareFill size={20} />
                  </Button>
                  <Button variant="light" onClick={handleDownload} className="rounded-pill p-2" disabled={isDownloading}>
                    {isDownloading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <CloudArrowDownFill size={20} />
                    )}
                  </Button>
                </div>
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
