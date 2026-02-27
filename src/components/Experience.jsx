export default function Experience() {
  return (
    <section className="services" id="services">
      <h2 className="heading">My <span>Experience</span></h2>
      <div className="services-container">
        <div className="services-box">
          <i className='bx bx-code-alt'></i>
          <h3>Frontend Development</h3>
          <p>Modern, responsive UI using React, HTML5 and CSS3. Focus on accessibility and performance.</p>
          <a href="#" className="btn">Read More</a>
        </div>

        <div className="services-box">
          <i className='bx bx-server'></i>
          <h3>Backend Development</h3>
          <p>APIs, authentication, database design and scalable server-side architecture.</p>
          
          <a href="#" className="btn">Read More</a>
        </div>

        <div className="services-box">
          <i className='bx bx-brain'></i>
          <h3>Machine Learning</h3>
          <p>Data modeling, training pipelines, and deploying models for production.</p>
          <a href="#" className="btn">Read More</a>
        </div>
      </div>
    </section>
  );
}