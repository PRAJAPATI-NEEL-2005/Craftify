import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import { CloudArrowDownFill, Image, ShareFill } from "react-bootstrap-icons";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your image.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setImageUrl("");
    setIsImageLoading(true);
    // Simulate an API call to the image generation service
    setTimeout(() => {
      try {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          prompt
        )}`;
        setImageUrl(url);
      } catch (err) {
        setError("Failed to generate image. Please try again.");
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
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${prompt.slice(0, 20).replace(/\s/g, "-") || "generated-image"}.png`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Could not download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Craftify AI Image",
          text: `Check out this AI-generated image I made with the prompt: "${prompt}"`,
          url: imageUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert(
        "Your browser does not support the Web Share API. Please try downloading the image instead."
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !isLoading) {
        handleGenerate();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
                <h2 className="text-center text-primary fw-bold mb-3">
                  <Image size={40} className="me-2" /> Generate Image
                </h2>
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
                  {error && (
                    <Form.Text className="text-danger mt-2">{error}</Form.Text>
                  )}
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
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Crafting...
                    </>
                  ) : (
                    "Generate"
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
        <Button
          variant="light"
          onClick={handleShare}
          className="rounded-pill p-2 me-2"
        >
          <ShareFill size={20} />
        </Button>
        <Button
          variant="light"
          onClick={handleDownload}
          className="rounded-pill p-2"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <CloudArrowDownFill size={20} />
          )}
        </Button>
      </div>
    </Card.Header>
    <Card.Body
      className="p-0 d-flex align-items-center justify-content-center"
      style={{ minHeight: "300px", height: "300px" }}
    >
      {isImageLoading && (
        <Spinner animation="border" variant="primary" />
      )}
      <img
        src={imageUrl}
        alt="AI Generated"
        className={`${isImageLoading ? "d-none" : ""}`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain"
        }}
        onLoad={() => setIsImageLoading(false)}
        onClick={() => setShowFullscreen(true)}
      />
    </Card.Body>
  </Card>
)}

          {!imageUrl && !isLoading && !error && (
            <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5 bg-light rounded-4 shadow-sm">
              <p className="text-muted">
                Your generated image will appear here.
              </p>
            </div>
          )}
          {showFullscreen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
   {/* Close Icon */}
<Button
  variant="light"
  onClick={() => setShowFullscreen(false)}
  style={{
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "40px",          // Equal width and height
    height: "40px",
    borderRadius: "50%",    // Perfect circle
    padding: 0,             // Remove extra padding
    display: "flex",        // Center the icon
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",       // Icon/text size
    fontWeight: "bold",
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
    cursor: "pointer"
  }}
>
  ✕
</Button>


    {/* Fullscreen Image */}
    <img
      src={imageUrl}
      alt="Fullscreen AI Generated"
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        objectFit: "contain",
        borderRadius: "8px"
      }}
    />
  </div>
)}
        </Col>
      </Row>
    </Container>
  );
}
