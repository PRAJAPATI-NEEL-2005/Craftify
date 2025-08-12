import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Spinner, Card } from 'react-bootstrap';
import { CloudArrowDownFill, MicFill } from 'react-bootstrap-icons';

export default function GenerateAudio() {
  const [prompt, setPrompt] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  const handleGenerateAudio = async () => {
    if (!prompt.trim()) {
      setError('Please enter some text to generate audio.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setAudioUrl('');

    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://text.pollinations.ai/${encodedPrompt}?model=openai-audio&voice=${selectedVoice}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to generate audio.');
      }

      const audioBlob = await response.blob();
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(newAudioUrl);
    } catch (err) {
      console.error('Audio generation failed:', err);
      setError('An error occurred while generating audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAudio = async () => {
    if (!audioUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(audioUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${prompt.slice(0, 20).replace(/\s/g, '-') || 'generated-audio'}.mp3`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Could not download audio. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerateMore = () => {
    setPrompt('');
    setAudioUrl('');
    setError(null);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={7} md={10}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4 d-flex flex-column align-items-stretch">
              <div>
                <h2 className="text-center text-primary fw-bold mb-3"><MicFill size={40} className='me-2 ' />Text to Speech Generator  </h2>
                <p className="text-muted text-center mb-4">
                    Enter your text , select a voice, and generate Speech. You can also download the generated speech file.
                </p>

                {!audioUrl && !isLoading && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Text to Synthesize</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="e.g., Hello, welcome to my creative app!"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        className="rounded-3"
                      />
                      {error && <Form.Text className="text-danger mt-2">{error}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Select a Voice</Form.Label>
                      <Form.Select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        disabled={isLoading}
                        className="rounded-3"
                      >
                        {voices.map((voice) => (
                          <option key={voice} value={voice}>
                            {voice.charAt(0).toUpperCase() + voice.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                )}

                {isLoading && (
                  <div className="d-flex flex-column justify-content-center align-items-center p-5">
                    <Spinner animation="grow" variant="primary" role="status" />
                    <p className="mt-3 text-muted">Synthesizing speech...</p>
                  </div>
                )}

                {audioUrl && !isLoading && (
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="mb-3 text-primary fw-bold">Generated Audio</h5>
                    <audio controls src={audioUrl} className="w-100" />
                    <Button
                      variant="outline-primary"
                      onClick={handleDownloadAudio}
                      disabled={isDownloading}
                      className="mt-3 rounded-pill"
                    >
                      {isDownloading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <CloudArrowDownFill size={18} className="me-2" />
                          Download Audio
                        </>
                      )}
                    </Button>

                    {/* NEW Generate More Button */}
                    <Button
                      variant="outline-primary"
                      onClick={handleGenerateMore}
                      className="mt-3 rounded-pill"
                    >
                      Generate More
                    </Button>
                  </div>
                )}
              </div>

              {!audioUrl && !isLoading && (
                <div className="d-grid mt-4">
                  <Button
                    variant="primary"
                    onClick={handleGenerateAudio}
                    disabled={isLoading}
                    className="btn-lg rounded-pill shadow-sm"
                  >
                    Generate Audio
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
