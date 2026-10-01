const socials = [
  { label: 'GitHub',   icon: 'bxl-github',          url: 'https://github.com/patrickeva' },
  { label: 'LinkedIn', icon: 'bxl-linkedin-square', url: 'https://www.linkedin.com/in/patrickeva/' },
  { label: 'Facebook', icon: 'bxl-facebook-square', url: 'https://www.facebook.com/ptrkrmseva' },
  { label: 'Email patrickramoseva@gmail.com', icon: 'bx-envelope', url: 'mailto:patrickramoseva@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          
          <p>
            © {new Date().getFullYear()} · <strong>Patrick Eva</strong>
          </p>
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
              <i className={`bx ${s.icon}`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
