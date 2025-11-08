import Header from "./Header";
import "./Home.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showSecond, setShowSecond] = useState(false);
  const secondRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSecond(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (secondRef.current) observer.observe(secondRef.current);

    return () => {
      if (secondRef.current) observer.unobserve(secondRef.current);
    };
  }, []);

  const handleAdd = (e) => {
    navigate("/add-book");
  };

  return (
    <div className={`page ${showSecond ? "show-second" : ""}`}>
      <Header />

      <section className="intro">
        <div className="text-box">
          <p>
            Hi, welcome to the Home Library
            <br />
            Discover and Manage your books, and grow your favorite part of your
            home.
          </p>
        </div>
      </section>

      <section className="options" ref={secondRef}>
        <div className="option-card">
          <h2>Explore Books</h2>
          <p>Check your books in your library</p>
          <div className="go">
            <button>Go</button>
          </div>
        </div>
        <div className="option-card">
          <h2>Add Book</h2>
          <p>Got new addition to your library? Add it here</p>
          <div className="go">
            <button onClick={handleAdd}>Go</button>
          </div>
        </div>
        <div className="option-card">
          <h2>Reading Goals</h2>
          <p>Edit your Reading Goals </p>
          <div className="go">
            <button>Go</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
