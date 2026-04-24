import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>DueSphere</h3>
            <p className={styles.footerText}>
              Enterprise-grade security, compliance, and performance audits. Building trust through transparency and rigorous assessment.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Services</h4>
            <nav className={styles.footerLinks}>
              <Link href="/services" className={styles.footerLink}>
                Our Services
              </Link>
              <Link href="/contact" className={styles.footerLink}>
                Request Audit
              </Link>
              <Link href="/about" className={styles.footerLink}>
                Why DueSphere
              </Link>
              <Link href="/faq" className={styles.footerLink}>
                FAQ
              </Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Company</h4>
            <nav className={styles.footerLinks}>
              <Link href="/about" className={styles.footerLink}>
                About Us
              </Link>
              <Link href="/contact" className={styles.footerLink}>
                Contact
              </Link>
              <Link href="/dashboard" className={styles.footerLink}>
                Dashboard
              </Link>
              <Link href="/newsletter" className={styles.footerLink}>
                Newsletter
              </Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Resources</h4>
            <nav className={styles.footerLinks}>
              <Link href="/blog" className={styles.footerLink}>
                Blog
              </Link>
              <Link href="/news" className={styles.footerLink}>
                News
              </Link>
              <Link href="/events" className={styles.footerLink}>
                Events
              </Link>
              <Link href="/gallery" className={styles.footerLink}>
                Gallery
              </Link>
              <Link href="/membership" className={styles.footerLink}>
                Membership
              </Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Legal</h4>
            <div className={styles.legalLinks}>
              <Link href="/privacy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <span className={styles.separator}>•</span>
              <Link href="/terms" className={styles.legalLink}>
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} DueSphere. All rights reserved. Enterprise Audit & Compliance Platform.
          </p>
        </div>
      </div>
    </footer>
  )
}
