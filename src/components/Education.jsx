import { useState } from 'react';

export default function Education() {
  const schools = [
    {
      name: 'National University Lipa',
      year: 'Bachelor of Science in Computer Sience (2022 - 2026)',
      location: 'SM City Lipa, Ayala Highway, Lipa City, Philippines',
      img: '/images/college.jpg',
    },
    {
      name: 'Cuenca Senior High School',
      year: 'Accountancy Business and Management (2019 - 2021)',
      location: 'Cuenca, Batangas',
      img: '/images/shs.jpg',
    },
    {
      name: 'Cuenca Institute',
      year: '(2015 - 2019)',
      location: 'Cuenca, Batangas',
      img: '/images/hshs.jpg',
    },
  ];

  const [activeImage, setActiveImage] = useState(schools[0].img);

  return (
    <section className="education site-section" id="education">
      <h2 className="heading">My <span>Education</span></h2>

      <div className="education-grid">
        <div className="edu-list">
          {schools.map((s, i) => (
            <div
              key={i}
              className="edu-card"
              onMouseEnter={() => setActiveImage(s.img)}
              onFocus={() => setActiveImage(s.img)}
              tabIndex={0}
              role="button"
            >
              <h3 className="edu-school">{s.name}</h3>
              <p className="edu-degree">{s.year}</p>
              <p className="edu-location">{s.location}</p>
            </div>
          ))}
        </div>

        <div className="edu-image">
          <div className="edu-hero">
            {activeImage ? (
              <img src={activeImage} alt="Selected school" />
            ) : (
              <div className="edu-hero-placeholder">School image (add to public/images)</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
