import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Button } from "react-bootstrap";
import PixelTransition from "./ReactBit/PixelTransition";
export default function Home() {
  const [loading, setLoading] = useState(true);
const topics = [
  "ocean",
  "desert",
  "mountains",
  "cyberpunk",
  "steampunk",
  "mythology",
  "superheroes",
  "architecture",
  "vintage",
  "futuristic",
  "wildlife",
  "sports",
  "fashion",
  "robotics",
  "medieval"
];


  // Function to handle image loading state
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="container text-center mt-5">
      <div className="py-5">
        <h1 className="display-4 fw-bold text-primary">
          Welcome to Craftify ✨
        </h1>
        <p className="lead text-muted mt-3">
          Unleash your creativity and turn your imagination into stunning
          AI-generated art with the power of Pollinations AI.
        </p>
        <Link to="/generate">
          <Button variant="primary" size="lg" className="mt-4 shadow-sm me-3">
            Start Creating Images
          </Button>
        </Link>
        <Link to="/generateaudio">
          <Button variant="primary" size="lg" className="mt-4 shadow-sm">
            Start Creating Speech
          </Button>
        </Link>
      </div>

      <hr className="my-5" />

      <h2 className="mb-4 text-primary">Explore AI-Generated Art</h2>
        <hr className="my-5" />
      <div className="row g-4">
        {topics.map((topic, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
           
              <div className="card-body p-0">
                {loading && (
                  <div
                    className="d-flex justify-content-center align-items-center bg-light"
                    style={{ height: "200px" }}
                  >
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
                <PixelTransition
                  firstContent={
                   <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "#697172ff",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 900,
                          fontSize: "1.5rem",
                          color: "#ffffffff",
                          textTransform: "capitalize",
                        }}
                      >
                        {topic}
                      </p>
                    </div>
                  }
                  secondContent={
                    
                     <img
                      src={`https://image.pollinations.ai/prompt/${topic}`}
                      alt={topic}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "0.5rem",
                        objectFit: "cover",
                      }}
                      onLoad={() => handleImageLoad(index)}
                    />
                  }
                  gridSize={12}
                  pixelColor="#ffffff"
                  animationStepDuration={0.4}
                  className="custom-pixel-card"
                />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
