import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS file

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1739361043380-f75ae825aee0?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I am Card 1",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1739198859134-94d2e0135cc0?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I am Card 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1739236131036-cad5287beda0?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I am Card 3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1739179418323-2d9517032c6f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I am Card 4",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Function to go to a specific slide via dots
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-scroll effect with reset
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, [currentIndex]); // Restart interval on currentIndex change

  return (
    <div className="carousel">
      <button className="left-arrow" onClick={prevSlide}>❮</button>

      <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <img 
              src={item.image} 
              alt={item.text} 
              onError={(e) => e.target.style.display = "none"} // Hide broken images
            />
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <button className="right-arrow" onClick={nextSlide}>❯</button>

      <div className="dots">
        {items.map((_, index) => (
          <span 
            key={index} 
            className={index === currentIndex ? "dot active" : "dot"} 
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
function DragAndDrop() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        className="draggable-box"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={handleMouseDown}
      >
        X: {position.x}, Y: {position.y}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h2>React Carousel</h2>
      <Carousel />
      <DragAndDrop />
    </div>
  );
}

export default App;
