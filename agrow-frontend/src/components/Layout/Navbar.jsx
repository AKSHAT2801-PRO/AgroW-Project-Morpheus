import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Leaf className={styles.logoIcon} />
                    <span className={styles.logoText}>AgroW</span>
                </div>
                <div className={styles.right}>
                    <select className={styles.languageSelect} defaultValue="en">
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                        <option value="mr">मराठी</option>
                    </select>
                    <Link to="/auth?mode=sign-in" className={styles.loginBtn}>
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
