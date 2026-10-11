import { Reveal, Spotlight, ease } from "./ui";
import Icon from "./Icon";

// Add real client feedback here. Only genuine quotes — ask permission before publishing a name.
// { quote: "...", name: "Juan Dela Cruz", role: "Operations Head", org: "BMTC", project: "BMTC Minibus Tracker" }
const testimonials = [];

// Shown only while running `npm run dev`, so you can preview the layout before real quotes come in.
const previewOnly = [
  {
    quote: "Sample quote — replace with real feedback from a client about the project and working with you.",
    name: "Client Name",
    role: "Position",
    org: "Organization",
    project: "Project name",
  },
  {
    quote: "Sample quote — a second client describing the result they got and how communication went.",
    name: "Client Name",
    role: "Position",
    org: "Organization",
    project: "Project name",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Testimonials() {
  const items = testimonials.length ? testimonials : import.meta.env.DEV ? previewOnly : [];
  if (!items.length) return null;

  return (
    <div className="testimonials">
      <Reveal className="subhead" y={12}>
        <Icon name="conversation" /> What clients say
        {!testimonials.length && <span className="testimonials__dev">dev preview only</span>}
      </Reveal>
      <div className="testimonials__grid">
        {items.map((t, i) => (
          <Spotlight
            as="figure"
            key={`${t.name}-${i}`}
            className="testimonial"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
          >
            <span className="testimonial__mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="testimonial__avatar" aria-hidden="true">{initials(t.name)}</span>
              <span>
                <strong>{t.name}</strong>
                <small>{[t.role, t.org].filter(Boolean).join(" · ")}</small>
              </span>
              {t.project && <span className="tag testimonial__project">{t.project}</span>}
            </figcaption>
          </Spotlight>
        ))}
      </div>
    </div>
  );
}
