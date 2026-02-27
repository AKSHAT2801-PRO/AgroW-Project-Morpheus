import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Column 1: Brand */}
                    <div className={styles.column}>
                        <div className={styles.brand}>
                            <Leaf className={styles.logoIcon} />
                            <span className={styles.logoText}>AgroW</span>
                        </div>
                        <p className={styles.tagline}>
                            Empowering farmers with technology and community for a sustainable future.
                        </p>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Platform</h4>
                        <ul className={styles.linkList}>
                            <li><Link to="/#farmers">For Farmers</Link></li>
                            <li><Link to="/#service-providers">For Service Providers</Link></li>
                            <li><Link to="/#buyers">For Buyers</Link></li>
                            <li><Link to="/#community">Community Hub</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources Links */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Resources</h4>
                        <ul className={styles.linkList}>
                            <li><Link to="/knowledge-base">Knowledge Base</Link></li>
                            <li><Link to="/government-schemes">Government Schemes</Link></li>
                            <li><Link to="/market-prices">Market Prices</Link></li>
                            <li><Link to="/weather">Weather Forecast</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact info & Language tags */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contact</h4>
                        <ul className={styles.contactList}>
                            <li>Email: contact@agrow.in</li>
                            <li>Phone: +91 1800-AGROW-IN</li>
                        </ul>
                        <div className={styles.languageTags}>
                            <span className={styles.langTag}>मराठी</span>
                            <span className={styles.langTag}>हिंदी</span>
                            <span className={styles.langTag}>English</span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} AgroW. All rights reserved.
                    </p>
                    <div className={styles.legalLinks}>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
