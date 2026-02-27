// import { useState } from "react";

// export default function Education() {
//   const schools = [
//     {
//       name: "Cuenca Senior High School",
//       year: "2019 - 2021",
//       location: "Cuenca, Batangas",
//       image: "/images/shs.jpg", // palitan mo ng actual image path
//     },
//     {
//       name: "Cuenca Institute",
//       year: "2015 - 2019",
//       location: "Cuenca, Batangas",
//       image: "/images/ci.jpg", // palitan mo
//     },
//   ];

//   const [activeImage, setActiveImage] = useState(schools[0].image);

//   return (
//     <section className="education-section" id="education">
//       <div className="education-container">
//         <h2 className="education-heading">
//           Edu<span>cation</span>
//         </h2>

//         <div className="education-grid">
//           {/* LEFT SIDE */}
//           <div className="education-list">
//             {schools.map((school, index) => (
//               <div
//                 className="education-card"
//                 key={index}
//                 onMouseEnter={() => setActiveImage(school.image)}
//               >
//                 <h3 className="school-name">{school.name}</h3>
//                 <p className="degree">{school.year}</p>
//                 <p className="location">{school.location}</p>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT SIDE IMAGE */}
//           <div className="education-image">
//             <div className="image-wrapper">
//               <img src={activeImage} alt="School" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }