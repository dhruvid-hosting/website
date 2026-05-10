import { Link } from "react-router-dom";
import monogramLogo from "../assets/druvid-logo-monogram.webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/hosting/">Shared Hosting</Link>
              </li>
              <li>
                <Link to="/managed/">Managed Plans</Link>
              </li>
              <li>
                <Link to="/managed/#custom">Custom Plans</Link>
              </li>
              <li>
                <Link to="/domains/">Domains</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/contact/">Contact Us</Link>
              </li>
              <li>
                <a
                  href="https://manage.dhruvid.com/submit-ticket"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit Ticket
                </a>
              </li>
              <li>
                <Link to="/affiliate/">Partner with us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/#about">About Us</Link>
              </li>
              <li>
                <Link to="/contact/">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/terms/">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund/">Refund Policy</Link>
              </li>
              <li>
                <Link to="/acceptable-use/">Acceptable Use</Link>
              </li>
              <li>
                <Link to="/spam/">Anti-Spam Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <img
              src={monogramLogo}
              alt="Dhruvid monogram"
              className="brand-mono"
              style={{ width: "28px", height: "28px" }}
            />
            <span>© {currentYear} Dhruvid. All rights reserved.</span>
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            Hosting Built on Dhruvid - Always Up. Always There.
          </p>
        </div>
      </div>
    </footer>
  );
}
