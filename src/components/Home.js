import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Spinner, Button } from 'react-bootstrap';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const topics = ["art", "nature", "space", "cityscape", "fantasy"];

  // Function to handle image loading state
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="container text-center mt-5">
      <div className="py-5">
        <h1 className="display-4 fw-bold text-primary">Welcome to Craftify ✨</h1>
        <p className="lead text-muted mt-3">
          Unleash your creativity and turn your imagination into stunning AI-generated art with the power of Pollinations AI.
        </p>
        <Link to="/generate">
          <Button variant="primary" size="lg" className="mt-4 shadow-sm">
            Start Creating Now
          </Button>
        </Link>
      </div>

      <hr className="my-5" />

      <h2 className="mb-4 text-dark">Explore AI-Generated Art</h2>
      <div className="row g-4">
        {topics.map((topic, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body p-0">
                {loading && (
                  <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: '200px' }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
                <img
                  src={`https://image.pollinations.ai/prompt/${topic}`}
                  alt={topic}
                  className={`img-fluid rounded-top ${loading ? 'd-none' : ''}`}
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="card-footer bg-white border-0 text-center py-3">
                <h5 className="card-title text-capitalize mb-0">{topic}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}