const skillData = [
  { name: "HTML & CSS", level: "70%" },
  { name: "JavaScript", level: "60%" },
  { name: "React", level: "60%" },
  { name: "Backend Development", level: "60%" },
  { name: "Python", level: "70%" },
  { name: "Machine Learning", level: "70%" },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h2 className="heading">Professional <span>Skills</span></h2>
      <div className="skills-container">
        {skillData.map((skill, index) => (
          <div key={index} className="skills-box">
            <h3>{skill.name}</h3>
            <div className="progress-bar">
              <div className="progress" style={{ width: skill.level }}></div>
            </div>
            <span>{skill.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}