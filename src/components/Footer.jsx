import Icon from "./Icon";
const socials = [
  { label: 'GitHub',   icon: 'github',          url: 'https://github.com/patrickeva' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/patrickeva/' },
  { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/ptrkrmseva' },
  { label: 'Email patrickramoseva@gmail.com', icon: 'mail', url: 'mailto:patrickramoseva@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          
          <p>
            © {new Date().getFullYear()} · <strong>Patrick Eva</strong>
          </p>
          <a href="/cv/Eva_Resume.pdf" target="_blank" rel="noopener noreferrer" className="footer__cv">
            <Icon name="file" /> Résumé (PDF)
          </a>
        </div>

        <div className="footer__socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              {...(s.url.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="icon-btn"
              aria-label={s.label}
              title={s.label}
            >
              <Icon name={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
