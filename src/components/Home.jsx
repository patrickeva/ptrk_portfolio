export default function Home() {
  return (
    <section className="home site-section" id="home">
      <div className="home-content">
        <h3>Hello, I am</h3>
        <h1>PATRICK EVA</h1>
        <p>Bachelor of Science in Computer Science</p>

        <div className="social-media">
          <a href="https://www.facebook.com/ptrkrmseva/">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="https://www.instagram.com/_ptrkeva/">
            <i className="bx bxl-instagram-alt"></i>
          </a>
          <a href="https://www.linkedin.com/in/patrick-eva-a8b249364/">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>

        <div className="home-buttons">
          <a
            href="/cv/Patrick_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View Resume
          </a>

          <a href="#contact" className="btn">
            Contact Me
          </a>
        </div>
      </div>

      <div className="about-img">
        <img src="/images/profile.jpeg" alt="Profile" />
      </div>
    </section>
  );
}