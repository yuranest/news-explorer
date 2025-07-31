import './Footer.css';
import { Link } from 'react-router-dom';
import githubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      <div className="footer__nav-block">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__socials">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <img src={githubIcon} alt="GitHub" className="footer__icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={facebookIcon} alt="Facebook" className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
